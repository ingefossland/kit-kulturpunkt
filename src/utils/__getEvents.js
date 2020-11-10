import _ from 'lodash';
import moment from 'moment';

export function getEventsByHour(datetime, events) {
    datetime = moment(datetime).format();
    
    let date = {
        date: moment(datetime).format('YYYY-MM-DD'),
        datetime: datetime,
        events: []
    }

    if (events && events.byHour && events.byHour[datetime]) {
        date.events = events.byHour[datetime].map(id => {
            return events.byId[id]
        });
    }

    return date;
}

export function getEventsByDate(datetime, events) {
    datetime = moment(datetime).format('YYYY-MM-DD');

    
    let date = {
        date: moment(datetime).format('YYYY-MM-DD'),
        datetime: datetime,
        events: []
    }
    
    if (events && events.byDate && events.byDate[datetime]) {
        date.events = events.byDate[datetime].map(id => {
            return events.byId[id]
        });
    }

    return date;
}

export function getEvents({events, dtStart, dtEnd}) {
    let dates = [];
    let hours = [];

    let byId = {};
    let byDate = {};
    let byHour = {};

    const sortedEvents = _.sortBy(events, 'startDate', 'endDate');            
    
    for (let i = 0; i < sortedEvents.length; i++) {
	    let item = sortedEvents[i];

	    let id = item['uniqueId'] || i;
	    let date = moment(item['startDate']).format('YYYY-MM-DD');
	    let hour = moment(item['startDate']);

        hour = moment(hour).set('minute', 0);
        hour = moment(hour).set('second', 0);
        hour = moment(hour).format();

	    byId[id] = item;
	    
	    if (byDate[date]) {
    	    byDate[date].push(id);
	    } else {
    	    byDate[date] = [id];
    	    dates.push(date);
	    }

	    if (byHour[hour]) {
    	    byHour[hour].push(id);
	    } else {
    	    byHour[hour] = [id];
    	    hours.push(hour);
	    }
    }

    return {
        dates, 
        hours, 
        byId, 
        byDate, 
        byHour
    }
}
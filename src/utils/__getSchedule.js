import _ from 'lodash';
import moment from 'moment';
import { getEvents, getEventsByDate } from ".."

export function getSchedule({date, items = [], months}) {
    
    if (!months) {
        months = 3;
    }
    
    const dt = moment(date).format('YYYY-MM-DD');
    const dtStart = moment(dt).format('YYYY-MM-DD');
    const dtEnd = moment(dt).add(months, 'months').format('YYYY-MM-DD');

    let events = {
        dates: []
    }
    
    if (items) {
        events = getEvents({items, dtStart, dtEnd});
    }

    let rows = [];
    
    for (var i = 0; i < events.dates.length; i++) {
        let dt = events.dates[i];
        
        let datetime = moment(dt);
        
        datetime = moment(datetime).set('hour', 0);
        datetime = moment(datetime).set('minute', 0);
        datetime = moment(datetime).set('second', 0);
        
        let date = getEventsByDate(datetime, events);

	    rows.push(date)
    }
    
    const schedule = {
        dt: dt,
        dtStart: dtStart,
        dtEnd: dtEnd,
        rows: rows,
        events: events
    }

    return schedule;
}

export default getSchedule
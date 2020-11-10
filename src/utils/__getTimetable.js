import _ from 'lodash';
import moment from 'moment';

export const getTimetable = ({date, days, timeFrom = 0, timeTo = 23}) => {

    if (!days) {
        days = 1;
    }
    
    const dt = moment(date).format('YYYY-MM-DD');
    const dtStart = moment(dt).format('YYYY-MM-DD');
    const dtEnd = moment(dt).add(days, 'days').format('YYYY-MM-DD');

    let cols = [];
    
    for (var d = 0; d < days; d++) {
        let datetime = moment(dtStart).add(d, 'days');
        
        datetime = moment(datetime).set('hour', 0);
        datetime = moment(datetime).set('minute', 0);
        datetime = moment(datetime).set('second', 0);
        
        let rows = [];

        for (var h = timeFrom; h <= timeTo; h++) {
            datetime = moment(datetime).set('hour', h);
            datetime = moment(datetime).set('minute', 0);
            datetime = moment(datetime).set('second', 0);

            const hour = moment(datetime).format('YYYY-MM-DD HH');
            
    	    rows.push(hour)
        }

	    cols.push(rows)
    }
    
    const timetable = {
        dt: dt,
        dtStart: dtStart,
        dtEnd: dtEnd,
        cols: cols,
    }

    return timetable;
}
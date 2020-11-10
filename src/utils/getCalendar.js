import moment from 'moment';
import "moment/locale/nb";
import "moment/locale/nn";
import "moment/locale/sv";

export const getCalendarMonth = ({date, format = 'YYYY-MM-DD'}) => {

    const dt = moment(date).format(format);

    const monthStart = moment(dt).startOf('month').format(format);
    const monthEnd = moment(dt).endOf('month').format(format);

    const dtStart = moment(dt).startOf('month').startOf('isoWeek').format(format);
    const dtEnd = moment(dt).endOf('month').endOf('isoWeek').format(format);
    const weeks = moment(dtEnd).diff(dtStart, 'week');


    const today =  moment().format(format)


    let rows = [];

    for (let w = 0; w <= weeks; w++) {
        let datetime = moment(dtStart).add(w, 'weeks');

        datetime = moment(datetime).set('hour', 0);
        datetime = moment(datetime).set('minute', 0);
        datetime = moment(datetime).set('second', 0);
        
        let cols = [];

        let week = datetime

        for (let d = 0; d <= 6; d++) {
            datetime = moment(week).add(d, 'days');

            const isToday = moment(datetime).isSame(today, 'day')
            const isCurrentMonth = moment(datetime).isBetween(monthStart, monthEnd, undefined, '[]')

    	    cols.push({
                isToday: isToday,
                isCurrentMonth: isCurrentMonth,
                date: moment(datetime).format(format),
            })
        }

	    rows.push(cols)
    }
    
    return {
        dt: dt,
        dtStart: dtStart,
        dtEnd: dtEnd,
        rows: rows,
    }
    
}

export default getCalendarMonth
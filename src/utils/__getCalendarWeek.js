import moment from 'moment';
import "moment/locale/nb";
import "moment/locale/nn";
import "moment/locale/sv";

export const getCalendarWeek = ({date, format = 'YYYY-MM-DD'}) => {

    const dt = moment(date).format(format);

    const dtStart = moment(dt).startOf('isoWeek').format(format);
    const dtEnd = moment(dt).endOf('isoWeek').format(format);
    const today =  moment().format(format)

    let cols = [];

    for (let d = 0; d <= 6; d++) {
        const datetime = moment(dtStart).add(d, 'days');

        const isToday = moment(datetime).isSame(today, 'day')

        cols.push({
            isToday: isToday,
            date: moment(datetime).format(format),
        })
    }

    return {
        dt: dt,
        dtStart: dtStart,
        dtEnd: dtEnd,
        cols: cols,
    }
    
}

export default getCalendarWeek
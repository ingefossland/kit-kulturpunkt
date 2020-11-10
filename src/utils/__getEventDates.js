import { RRule, RRuleSet, rrulestr } from 'rrule'
import moment from "moment"
import "moment/locale/nb";
import "moment/locale/nn";
import "moment/locale/sv";

moment.locale('nb')

const getEventDates = ({event, fromDate, toDate}) => {

    const rrule = event && event.rrule
    const repeat = event && event.repeat
    const dtStart = event && event.dtStart

    if (!repeat && dtStart) {
        return [
            dtStart
        ]
    }

    // max 1 year

    fromDate = fromDate && moment(fromDate) || moment(dtStart) || moment()
    toDate = toDate && moment(toDate) || moment(fromDate).add(3, "month")

    let rule
    
    if (rrule) {
        rule = RRule.fromString("RRULE:"+rrule)
    }

    let dates

    dates = rule && rule.between(moment(fromDate).toDate(), moment(toDate).toDate()) || []

    if (!dates && dtStart) {
        return [dtStart]
    }

    return dates.map(date => {
        return moment(date).format("YYYY-MM-DD")
    })

}

export default getEventDates
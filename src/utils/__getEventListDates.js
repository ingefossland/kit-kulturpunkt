import { RRule, RRuleSet, rrulestr } from 'rrule'
import moment from "moment"
import "moment/locale/nb";
import "moment/locale/nn";
import "moment/locale/sv";

moment.locale('nb')

const getEventDate = (date) => {
    return moment(date).format("YYYY-MM-DD")
}

const getEventItemDates = ({event = {}, dates = [], fromDate, toDate}) => {

    const { dtStart, dtEnd, repeat, rrule } = event

    //  single event

    if (!repeat && dtStart) {
        dates.push(getEventDate(dtStart))
        return dates
    }

    // max 1 year

    fromDate = fromDate && moment(fromDate) || moment(dtStart) || moment()
    toDate = toDate && moment(toDate) || moment(fromDate).add(3, "month")

    let rule
    
    if (rrule) {
        rule = RRule.fromString("RRULE:"+rrule)
    }

    console.log("rule", rule)
    console.log("fromDate", fromDate.format("YYYY-MM-DD"))
    console.log("toDate", toDate.format("YYYY-MM-DD"))

    let ruleDates

    ruleDates = rule && rule.between(moment(fromDate).toDate(), moment(toDate).toDate()) || []

    if (ruleDates) {
        ruleDates.map(date => {
            dates.push(getEventDate(date))
        })
    }

    return dates
    
}

const getEventListDates = ({eventList = [], fromDate, toDate}) => {

    let dates = []

    eventList && eventList.length && eventList.map(event => {
        dates = getEventItemDates({event, dates, fromDate, toDate})
    })

    const sortedDates = Array.from(dates).sort()

    console.log('DATES', sortedDates)

    return sortedDates


    return dates.sort((a,b)=>a-b)
    
}

export default getEventListDates
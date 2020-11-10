import { RRule } from 'rrule'
import moment from 'moment';
import _ from "lodash"

import { getICalEvent } from "."

export const getICalEventQuery = ({vEvent, query}) => {

    let { from, to, days = 3 } = query

    from = from && moment(from).startOf('day') || moment().startOf('day')
    to = to && moment(to).endOf('day') || moment(from).add(days, "days").endOf('day')

    const { DTSTART, DTEND, RRULE, CATEGORIES } = vEvent

    let results = [], dates = []

    // queries

    let hits = true

    if (query.category && CATEGORIES) {

        const categories = CATEGORIES.split(",")

        if (!categories.includes(query.category)) {
            hits = false
        }

        if (!hits) {
            return {
                results
            }
        }
    
    }


    // rrules

    if (RRULE) {

    
        let eventRRule

        if (DTSTART) {
            eventRRule = RRule.fromString("RRULE:"+RRULE+"\nDTSTART:"+DTSTART)
        } else {
            eventRRule = RRule.fromString("RRULE:"+RRULE)
        }

        const eventDates = eventRRule.between(moment(from).toDate(), moment(to).toDate())

        eventDates && eventDates.map(date => {

            const startHour = moment(DTSTART)
            const endHour = moment(DTEND)
            const hours = moment(endHour).diff(startHour, 'hour');
            
            const start = moment.utc(date).format("YYYY-MM-DDTHH:mm:ss")
            const end = moment.utc(date).add(hours, 'hours').format("YYYY-MM-DDTHH:mm:ss")

            const event = getICalEvent({
                ...vEvent,
                start: start,
                end: end
            })

            results.push(event)
            
        })

    } else {

        const event = getICalEvent({...vEvent})

        results.push(event)

    }

    return {
        results
    }

}

export default getICalEventQuery
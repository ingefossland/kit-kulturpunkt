import moment from "moment"
import getVCalendarEventRRule from "./getVCalendarEventRRule"
import { v4 as uuidv4 } from 'uuid';

export const getVCalendarEvent = (event = {}) => {

    if (event.rrule === "custom") {
        event.rrule = getVCalendarEventRRule(event)
    }

    if (!event.rrule) {
        delete event.rrule
    }

    if (!event.uid) {
        event.uid = event.uniqueId || event.id || uuidv4()
    }

    let vEvent = []

    vEvent.push("BEGIN:VEVENT")

    const { allday, repeat, title } = event

    if (!event.summary && title) {
        event.summary = title
    }

    Object.keys(event).map(name => {

        const KEY = name.toUpperCase()
        const VALUE = event && event[name]

        if (allday && (KEY === "DTSTART" || KEY === "DTEND")) {
            vEvent.push(KEY+":"+moment(VALUE).format("YYYYMMDD"))
        } else if (KEY === "DTSTART" || KEY === "DTEND") {
            vEvent.push(KEY+":"+moment(VALUE).format("YYYYMMDDTHHmmss"))
        }

        if (KEY === "RRULE") {
            vEvent.push(KEY+":"+VALUE)            
        }

        if (KEY === "CATEGORIES") {
            vEvent.push(KEY+":"+VALUE)            
        }

        if (KEY === "UID" || KEY === "RECURRENCE-ID" || KEY === "SUMMARY" || KEY === "LOCATION") {
            vEvent.push(KEY+":"+VALUE)            
        }

    })

    vEvent.push("END:VEVENT")
    
    return "" + vEvent.join("\n") + ""

}

export default getVCalendarEvent
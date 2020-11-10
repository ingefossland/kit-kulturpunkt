import getVCalendar from "./getVCalendar"
import getICalQuery from "./getICalQuery"
import moment from "moment"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"

export const getChildEvents = ({child: { uniqueId, content }, events = [], programById}) => {

    content && content.calendar && content.calendar.events && content.calendar.events.map((item, index) => {
        let event = Object.assign({}, item)
        event.id = item.id || uniqueId + "-" + index
        event.program = content.program
        programById[event.id] = content.program
        events.push(event)
    })
    
    return events

}

export const getEvent = ({formData: { uniqueId, content }, query = {}}) => {
 
    let calendar = {}

    let eventsById = {}

    let programById = {
        [uniqueId]: content.program || {}
    }

    const calendarEvents = content.calendar && content.calendar.events

    if (calendarEvents) {

        let events = []

        content.children && content.children.map(child => {
            getChildEvents({child, events, programById})
        })

        calendarEvents && calendarEvents.map((item, index) => {
            let event = Object.assign({}, item)
            event.id = item.id || uniqueId + "-" + index
            event.program = content.program
            programById[event.id] = content.program
            events.push(event)
        })

        events.length && events.map(({id, ...item}) => {
            eventsById[id] = item
        })

        const iCal = events.length && getVCalendar({events})

        calendar = getICalQuery({iCal, query}) || { }

        calendar = {
            ...content.calendar,
            ...calendar,
            iCal: iCal,
            events: events,
            items: calendar.items.map(item => { return {...eventsById[item.id], ...item}}),
        }

    }

    return {
        ...content,
        calendar: calendar,
        eventsByDate: calendar.byDate,
        eventsById: eventsById,
        programById: programById,
    }

}

export default getEvent
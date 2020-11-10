import getVCalendar from "./getVCalendar"
import getICalQuery from "./getICalQuery"
import moment from "moment"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"

export const getEventCalendar = ({uniqueId, calendar = {}, query = {}}) => {

    let events = [], byId = {}

    calendar.events && calendar.events.map((item, index) => {
        const id = item.id || uniqueId + "-" + index
        const event = {
            ...item,
            id: id
        }

        events.push(event)
        byId[id] = event
    })

    
    const iCal = getVCalendar({events}) 
    const results = getICalQuery({iCal, query})

    const items = results.items && results.items.map(item => {
        return {
            ...byId[item.id],
            ...item,
        }
    })
    
    return {
        ...calendar,
        ...results,
        byId: byId,
        items: items
    }

}
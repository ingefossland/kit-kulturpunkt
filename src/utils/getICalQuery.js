import ical2json from  "ical2json";
import _ from "lodash"

import getICalEventQuery from "./getICalEventQuery"

export const getICalQuery = ({iCal, query = {}}) => {

    if (!iCal) {
        return false
    }

    const data = ical2json.convert(iCal);

    const vCalendars = data && data.VCALENDAR 

    let items = [], dates = [], byDate = {}

    if (vCalendars) {

        vCalendars && vCalendars.map(vCalendar => {
            let vEvents = vCalendar && vCalendar.VEVENT

            vEvents = _.orderBy(vEvents, 'DTSTART', 'desc')
            vEvents = _.orderBy(vEvents, 'RECURRENCE-ID', 'asc')

            vEvents && vEvents.map(vEvent => {
    
                const search = getICalEventQuery({vEvent, query})
    
                search.results && search.results.map(event => {
                    const { uid, date } = event

                    if (!dates.includes(date)) {
                        dates.push(date)
                    }

                    items.push(event)

                    if (!byDate[date]) {
                        byDate[date] = []
                    }

                    byDate[date].push(event)
                    
                })
    
            })
    
        })

    }

    items = _.orderBy(items, 'start', 'asc');

    return {
        query,
        dates,
        items,
        byDate
    }

}

export default getICalQuery
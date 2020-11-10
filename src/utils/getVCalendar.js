import getVCalendarEvent from "./getVCalendarEvent"

const vCalStart = "BEGIN:VCALENDAR\n" +
"VERSION:2.0\n" +
"BEGIN:VTIMEZONE\n" +
"TZID:Europe/Oslo\n" +
"X-LIC-LOCATION:Europe/Oslo\n" +
"BEGIN:DAYLIGHT\n" +
"TZOFFSETFROM:+0100\n" +
"TZOFFSETTO:+0200\n" +
"TZNAME:CEST\n" +
"DTSTART:19700329T020000\n" +
"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\n" +
"END:DAYLIGHT\n" +
"BEGIN:STANDARD\n" +
"TZOFFSETFROM:+0200\n" +
"TZOFFSETTO:+0100\n" +
"TZNAME:CET\n" +
"DTSTART:19701025T030000\n" +
"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\n" +
"END:STANDARD\n" +
"END:VTIMEZONE"

const vCalEnd = "END:VCALENDAR";

export const getVCalendar = ({uniqueId, events = []}) => {

    if (!events.length) {
        return undefined
    }

    let vCalendar = []

    vCalendar.push(vCalStart)

    events.map(event => {

        event && vCalendar.push(getVCalendarEvent({...event, uniqueId: uniqueId}))

        event.exceptions && event.exceptions.map((xEvent, index) => {

            xEvent.uid = event.uid;
            xEvent['recurrence-id'] = event.uid + "-" + index;

            xEvent && vCalendar.push(getVCalendarEvent(xEvent))
        })

    })

    vCalendar.push(vCalEnd)    

    return vCalendar.join("\n")

}

export default getVCalendar
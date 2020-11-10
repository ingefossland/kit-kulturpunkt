import moment from 'moment';

export const getICalEvent = ({start, end, ...vEvent}) => {
    const { UID, SUMMARY, DESCRIPTION, LOCATION, DTSTART, DTEND } = vEvent

    const allDay = DTSTART && DTSTART.length === 8

    if (!start) {
        start = DTSTART
    }

    if (!end) {
        end = DTEND
    }

    let dt

    if (allDay) {
        start = moment(start).format("YYYY-MM-DD")
        end = moment(end).format("YYYY-MM-DD")
    } else {
        start = moment(start).format("YYYY-MM-DDTHH:mm")
        end = moment(end).format("YYYY-MM-DDTHH:mm")
//        start = moment(start).format("YYYY-MM-DD") + "T" + moment(DTSTART).format("HH:mm");
//        end = moment(end).format("YYYY-MM-DD") + "T" +  moment(DTEND).format("HH:mm");
    }

    const date = moment(start).format("YYYY-MM-DD")

    const startTime = start && moment(start).format("HH:mm");
    const endTime = end && moment(end).format("HH:mm");

    const time = allDay && "Hele dagen" || startTime !== endTime && startTime + "–" + endTime || startTime

    
    return {
        ...vEvent,
        id: UID,
        uniqueId: UID,
        date: date,
        time: time,
        dt: start,
        title: SUMMARY,
        description: DESCRIPTION,
        location: LOCATION,
        allDay: allDay,
        start: start,
        end: end

    }

}

export default getICalEvent
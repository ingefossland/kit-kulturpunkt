import moment from "moment"

export const getEventsByHour = ({dt, events = []}) => {

    const hour = moment(dt).format("HH:mm")

    let eventsByHour = []

    events.map(event => {

        const eventHour = event.startAt && moment(event.startAt).format("HH:mm")

        if (eventHour === hour) {
            eventsByHour.push(event)
        }

    })

    return eventsByHour

}
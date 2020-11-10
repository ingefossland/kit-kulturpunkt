import moment from "moment"

export const getEventsByDate = ({dt, events = []}) => {

    const date = moment(dt).format("YYYY-MM-DD")

    let eventsByDate = []

    events.map(event => {

        const eventDate = event.dt && moment(event.dt).format("YYYY-MM-DD")

        if (eventDate === date) {
            eventsByDate.push(event)
        }

    })

    return eventsByDate

}
import moment from "moment"
import _ from "lodash"

export const getCheckoutSlots = ({slots = {}, location, statusById = {}, statusByDate = {}, calendar = {}, query = {}}) => {

    const { event, date } = query

    slots.dates = calendar && calendar.dates && calendar.dates.map(d => {

        const status = statusByDate && statusByDate[d]

        return {
            date: d,
            selected: date === d,
            ...status
        }

    })

    slots.dates = _.orderBy(slots.dates, 'date', 'asc');

    let byId = {}

    slots.items = date && calendar && calendar.byDate[date].map((item, index) => {

        const parentId = item.id;
        const parent = calendar && calendar.byId && calendar.byId[parentId]

        const hour = item.start && moment(item.start).format("HHmm") || index;
        const id = moment(date).format("YYYYMMDD") + "-" + hour;

        const status = statusById && statusById[id] || statusByDate && statusByDate[date]
        const selected = id === event


        item = {
            ...parent,
            ...item,
            ...status,
            location: item.location || location,
            selected: selected,
            id: id,
            date: date,
            hour: hour
        }

        byId[id] = item

        return item

    })

    slots.items = _.orderBy(slots.items, 'start', 'asc');

    return {
        ...slots,
        byId: byId
    }
    
}
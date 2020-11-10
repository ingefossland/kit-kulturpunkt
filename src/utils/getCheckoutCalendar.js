import moment from "moment"
import _ from "lodash"

export const getCheckoutCalendar = ({calendar = {}, location, statusById = {}, statusByDate = {}, query = {}}) => {

    const { date, days } = query

    let byId = {}
   
    calendar.items = calendar.items.map((item, index) => {
        const id = item.id;
        const status = statusByDate && statusByDate[item.date] || statusById && statusById[id]

        const endDate = date && days > 1 && moment(date).add(days, "days")
        const selected = moment(item.date).isSame(date, 'day') || days > 1 && moment(item.date).isBetween(date, endDate) 

        item = {
            ...item,
            ...status,
            location: item.location || location,
            selected: selected,
        }

        byId[id] = item

        return item

    })

    return {
        ...calendar,
        byId: byId
    }
    
}
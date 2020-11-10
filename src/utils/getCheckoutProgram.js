import moment from "moment"
import _ from "lodash"

export const getCheckoutProgram = ({program = {}, statusById = {}, statusByDate = {}, query = {}}) => {

    const { event, date } = query

    let byId = {}

    program.items = program.items.map((item, index) => {

        const parentId = item.id;
        const id = parentId + "-" + moment(date).format("YYYYMMDD");

        const status = statusById && statusById[id] || statusByDate && statusByDate[date]

        item = {
            ...item,
            ...status,
            id: id,
            date: date,
        }

        byId[id] = item

        return item

    })

    program.items = _.orderBy(program.items, 'start', 'asc');

    return {
        ...program,
        byId: byId
    }
    
}
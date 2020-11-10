import moment from "moment"

export const getEventRRule = (formData = {}) => {

    if (!formData) {
        return
    }

    let rrules = {}

    Object.keys(formData).map(name => {

        const KEY = name.toUpperCase()
        let VALUE = formData && formData[name]

        if (Array.isArray(VALUE)) {
            VALUE = VALUE.join(",")
        }

        rrules[KEY] = VALUE

    })

    const { FREQ, INTERVAL, BYMONTH, BYMONTHDAY, BYDAY, BYSETPOS, COUNT, UNTIL, ALLDAY } = rrules

    if (!FREQ || FREQ === "undefined") {
        return undefined
    }


    let rrule = []

    rrule.push("FREQ="+FREQ)

    if (INTERVAL) {
        rrule.push("INTERVAL="+INTERVAL)
    }

    // YEARLY

    if (FREQ === "YEARLY") {

        if (BYMONTH && BYMONTH.length) {
            rrule.push("BYMONTH="+BYMONTH)
        }

    }

    if (FREQ === "YEARLY" || FREQ === "MONTHLY") {

        if (BYSETPOS && BYSETPOS.length) {
            rrule.push("BYSETPOS="+BYSETPOS)
            rrule.push("BYDAY="+BYDAY)
        } else if (BYMONTHDAY && BYMONTHDAY.length) {
            rrule.push("BYMONTHDAY="+BYMONTHDAY)
        }

    }
        

    if (FREQ === "WEEKLY" || FREQ === "HOURLY" || FREQ === "MINUTELY") {

        if (BYDAY && BYDAY.length) {
            rrule.push("BYDAY="+BYDAY)
        }
    
    }

    // ENDS

    if (UNTIL && ALLDAY) {
        rrule.push("UNTIL="+moment(UNTIL).format('YYYYMMDD'))
    } else if (UNTIL) {
        rrule.push("UNTIL="+moment(UNTIL).format('YYYYMMDDTHHmmss'))
    }

    if (COUNT) {
        rrule.push("COUNT="+COUNT)
    }
    
    return rrule.join(";")

}

export default getEventRRule
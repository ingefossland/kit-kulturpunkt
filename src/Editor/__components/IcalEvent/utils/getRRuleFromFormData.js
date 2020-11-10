import moment from "moment"

export const getRRuleFromFormData = (formData = {}) => {

    if (!formData) {
        return
    }

    const { FREQ, INTERVAL, BYMONTH, BYMONTHDAY, BYDAY, BYSETPOS, ENDS, COUNT, UNTIL } = formData

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
            rrule.push("BYMONTH="+BYMONTH.join(","))
        }

    }

    if (FREQ === "YEARLY" || FREQ === "MONTHLY") {

        if (BYSETPOS && BYSETPOS.length) {
            rrule.push("BYSETPOS="+BYSETPOS.join(","))
            rrule.push("BYDAY="+BYDAY.join(","))
        } else if (BYMONTHDAY && BYMONTHDAY.length) {
            rrule.push("BYMONTHDAY="+BYMONTHDAY.join(","))
        }

    }
        

    if (FREQ === "WEEKLY" || FREQ === "HOURLY" || FREQ === "MINUTELY") {

        if (BYDAY && BYDAY.length) {
            rrule.push("BYDAY="+BYDAY.join(","))
        }
    
    }

    // ends

    if (ENDS) {

        if (UNTIL) {
            rrule.push("UNTIL="+moment(UNTIL).format('YYYYMMDD'))
        }
    
        if (COUNT) {
            rrule.push("COUNT="+COUNT)
        }
    
    }

    
    return rrule.join(";")

}
export const getFormDataFromRRule = (rrule) => {
    
    const rules = rrule && rrule.length && rrule.split(";")

    let formData = {}

    rules && rules.map(rule => {
        const rrule = rule.split("=")
        const name = rrule[0]
        const value = rrule[1]

        if (name && value) {

            if (name === "BYDAY" || name === "BYMONTH" || name === "BYMONTHDAY" || name === "BYSETPOS") {
                formData[name] = value.split(",")
            } else {
                formData[name] = value
            }

        }

    })

    return formData

}
import moment from "moment"

export const getIcalEventFromFormData = (formData = {}) => {

    if (!formData) {
        return
    }

    let vEvent = []

//    vEvent.push("BEGIN:VEVENT")

    const { allday, repeat } = formData

    Object.keys(formData).map(name => {

        const KEY = name.toUpperCase()
        const VALUE = formData && formData[name]

        if (allday && (KEY === "DTSTART" || KEY === "DTEND")) {
            vEvent.push(KEY+":"+moment(VALUE).format("YYYYMMDD"))
        } else if (KEY === "DTSTART" || KEY === "DTEND") {
            vEvent.push(KEY+":"+moment(VALUE).format("YYYYMMDDTHHmmss"))
        }

        if (repeat && KEY === "RRULE") {
            vEvent.push(KEY+":"+VALUE)            
        }

    })

//    vEvent.push("END:VEVENT")
    
    return "" + vEvent.join("\n") + ""

}
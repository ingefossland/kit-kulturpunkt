import { requestModel, receiveModel } from "./"
import moment from "moment"


const getDisplayValue = ({displayValue, locale = "no"}) => {

    if (displayValue && displayValue[locale]) {
        return displayValue[locale]
    }

}

const getEventTime = ({value}) => {
    return moment(value.substr(0,8)).format("YYYY-MM-DD")
}


const getPersonBirth = ({properties}) => {

    let date = null
    let place = null

    if (properties["event.time"]) {
        date = getEventTime(properties["event.time"][0])
    }

    return {
        date: date,
        place: place
    }

}


const convertKnav = ({properties, ...props}) => {

    let birth, gender

    if (properties["person.birth"]) {
        birth = getPersonBirth(properties["person.birth"][0].value)
    }

    if (properties["person.gender"]) {
        gender = getDisplayValue(properties["person.gender"][0])
    }

    return {
        ...props,
        gender: gender,
        birthDate: birth && birth.date,
        birthPlace: birth && birth.place
    }

}


export const getKulturnav = ({source = "knav", sourceId}) => dispatch => {

    const uniqueId = source + "/" + sourceId

    uniqueId && dispatch(requestModel({uniqueId}))

    const apiUrl = "https://kulturnav.org/api/" + sourceId

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
        }})
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(formData => {

            const converted = convertKnav(formData)

            dispatch(receiveModel({
                ...formData,
                ...converted,
                source,
                sourceId,
                uniqueId: uniqueId
            }))
        })

}
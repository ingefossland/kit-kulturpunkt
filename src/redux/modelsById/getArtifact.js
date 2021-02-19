import { requestModel, receiveModel } from "./"
import moment from "moment"

const getTimespan = ({fromYear, toYear, fromDate, toDate}) => {

    let dtStart, dtEnd, label

    if (fromYear && toYear) {
        dtStart = fromYear
        dtEnd = toYear
        label = dtStart === dtEnd && dtStart || dtStart + "–" + dtEnd
    } else if (fromDate && toDate) {
        dtStart = moment(fromDate.substr(0,8)).format("YYYY-MM-DD")
        dtEnd = moment(toDate.substr(0,8)).format("YYYY-MM-DD")

        if (moment(dtStart).isSame(dtEnd, 'day')) {
            label = moment(dtStart).format("DD.MM.YYYY")
        } else if (moment(dtStart).isSame(dtEnd, 'month')) {
            label = moment(dtStart).format("DD.") + "–" + moment(dtEnd).format("DD.MMMM.YYYY")
        } else if (moment(dtStart).isSame(dtEnd, 'year')) {
            label = moment(dtStart).format("DD. MMMM") + "–" + moment(dtEnd).format("DD. MMMM YYYY")
        } else {
            label = moment(dtStart).format("DD. MMMM YYYY") + "–" + moment(dtEnd).format("DD. MMMM YYYY")
        }

    }

    if (!dtStart) {
        return false
    }


    return {
        dtStart: dtStart,
        dtEnd: dtEnd,
        value: label
    }

}

const getMedia = ({media}) => {

    const images = media.pictures && media.pictures.map(item => {

        const { width, height, identifier } = item

        return {
            mediaId: identifier,
            media: {
                mediaWidth: width,
                mediaHeight: height,
                imageUrl: "//dms06.dimu.org/image/" + identifier
            }
        }
    })

    return images

}

const getEvents = ({artifactType, exhibition, eventWrap}) => {

    if (artifactType === "Exhibition") {

        const dating = getTimespan(exhibition.timespan)

        return [{
            label: "Utstilt",
            value: dating && dating.value,
            dating: dating
        }]

    }

    const events = eventWrap && eventWrap.events && eventWrap.events.map(event => {

        const eventType = event.eventType
        const timespan = event.timespan

        const dating = timespan && getTimespan(timespan)

        return {
            label: dating && dating.value,
            value: eventType,
            dating: dating
        }


    })    

    return events
}

const getTitle = ({artifactType, title, person, titles, exhibition}) => {

    if (artifactType === "Exhibition") {
        return exhibition.titles && exhibition.titles[0] && exhibition.titles[0].title
    }

    if (artifactType === "Person") {
        return person && person.name
    }

    if (titles && titles[0] && titles[0].title) {
        return titles && titles[0] && titles[0].title 
    }

    return title

}



const getReferences = (refs) => {

    return refs && refs.map(uuid => {
        return {
            uuid: uuid
        }
    })

}

const convertArtifact = ({modelName, uniqueId, ...props}) => {

    const { artifactType, person, names, titles, eventWrap, technique, material, partOfExhibitionUuids, partOfFolderUuids } = props

    const producers = eventWrap && eventWrap.producers
    const production = eventWrap && eventWrap.production

    const producer = producers && producers[0] || {}
    const dating = production && production.timespan && getTimespan(production.timespan)

    const events = eventWrap && getEvents(props)

    const media = props.media && getMedia({media: props.media})
    const imageUrl = media && media[0] && media[0].media && media[0].media.imageUrl

    const materials = material && material.materials && material.materials.map(item => {
        return {
            value: item.material
        }
    })

    const techniques = technique && technique.techniques && technique.techniques.map(item => {
        return {
            value: item.technique
        }
    })


    const title = getTitle(props)

    const label = names && names[0] && names[0].name

    const exhibitions = partOfExhibitionUuids && getReferences(partOfExhibitionUuids)
    const folders = partOfFolderUuids && getReferences(partOfFolderUuids)

    const documentType = artifactType && artifactType.toLowerCase()

    return {
        modelName,
        uniqueId,
        documentType: documentType,
        imageUrl,
        title,
        label,
        dating,
        producer,
        producers,
        production,
        materials,
        techniques,
        events,
        exhibitions,
        folders
    }

}


export const getArtifact = ({modelName = "ekultur", sourceId, uuid}) => dispatch => {

    const uniqueId = sourceId && modelName + "/" + sourceId || uuid && modelName + "/" + uuid

    uniqueId && dispatch(requestModel({uniqueId}))

    const apiUrl = sourceId && "store.dimu.org/artifact/dimu_code/" + sourceId || uuid && "store.dimu.org/artifact/uuid/" + uuid
    const corsUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl

    fetch(corsUrl, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
        }})
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(artifact => {
            const formData = convertArtifact({
                ...artifact,
                modelName,
                uniqueId
            })

            const { exhibitions, folders } = formData

            exhibitions && exhibitions.map(ref => dispatch(getArtifact(ref)))
//            folders && folders.map(ref => dispatch(getArtifact(ref)))

            dispatch(receiveModel(formData))
        })

}
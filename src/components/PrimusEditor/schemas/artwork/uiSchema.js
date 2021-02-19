import basis from "./basis.uiSchema"
import metadata from "./metadata.uiSchema"
import appearance from "./appearance.uiSchema"
import motif from "./motif.uiSchema"
import measure from "./measure.uiSchema"
import events from "./events.uiSchema"
import media from "./media.uiSchema"

export default {
    "ui:preview": {
        "select": {
            "imageUrl" : "imageUrl",
            "mediaWidth": "mediaWidth",
            "mediaHeight": "mediaHeight",
            "title" : "title",
            "description" : "description",
            "identifier": "identifier",
            "metadata" : "metadata",
            "label": "label",
            "artist": "artist",
            "dating": "dating",
            "materials": "materials",
            "techniques": "techniques",
            "measures": "measures",
            "depictedPeople": "depictedPeople",
            "depictedPlaces": "depictedPlaces"
        },
        prepare({formData, formContext}) {
            const { documentType, content = {} } = formData
    
            if (content) {
    
                const { images, title, identifier, artist = {}, dating = {}, designation, materials, techniques, measures, depictedPeople, depictedPlaces } = content
   
                
                const image = images && images[0] && images[0].media
                const imageUrl = image && image.imageUrl
                const imageWidth = image && image.mediaWidth
                const imageHeight = image && image.mediaHeight
    
                let cols = {}, description = []

                if (artist && artist.value) {
                    description.push(artist.value)
                }

                if (dating && dating.value) {
                    description.push("(" + dating.value + ")")
                }

                let label

                if (designation && designation.value) {
                    label = designation.value
                }

                return {
                    imageUrl: imageUrl,
                    imageWidth: imageWidth,
                    imageHeight: imageHeight,
                    title: title || "Uten tittel",
                    description: description.join(" "),
                    label: label,
                    identifier: identifier,
                    artist: artist.value,
                    dating: dating.value,
                    materials: materials && materials.map(material => material.value),
                    techniques: techniques && techniques.map(technique => technique.value),
                    measures: measures && measures.map(measures => measures.size),
                    depictedPeople: depictedPeople && depictedPeople.map(person => person.value),
                    depictedPlaces: depictedPlaces && depictedPlaces.map(place => place.value),

                }
    
            }
      
            return {
                imageUrl: formData.imageUrl,
                title: formData.title || "Uten tittel",
                description: undefined,
                label: documentType,
            }
        }
    
    },
    "ui:field": "primusEditor",
    "ui:fieldset": [
        "content"
    ],
    "content": {
        "ui:field": "primusContent",
        "ui:fieldset": [
            "basis",
            "measure",
            "metadata",
            "appearance",
            "motif",
            "events",
            "media",
        ],
        "basis": basis,
        "measure": measure,
        "metadata": metadata,
        "motif": motif,
        "appearance": appearance,
        "events": events,
        "media": media,
        "images": {
            "ui:field": "primusMedia",
        }
    }
}
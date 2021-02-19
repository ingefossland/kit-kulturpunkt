import React, { useState, useEffect } from "react"
import KnavListField from "./KnavListField"
import PlaceField from "./PlaceField"
import model from "./Place.model"

const PlacesListField = (props) => {

    const schema = {
        "type": "array",
        "items": model.schema
    }

    const uiSchema = {
        ...props.uiSchema,
        "ui:search": {
            "placeholder": "Finn sted",
            "query": {
                "entityType": "Place"
            },
        }, 
        "items": {
            ...model.uiSchema,
            "ui:field": PlaceField
        }
    
    }

    return (
        <KnavListField {...props} schema={schema} uiSchema={uiSchema} />
    )

}

PlacesListField.defaultProps = {
    formData: {
        
    }
}

export default PlacesListField
import React, { useState, useEffect } from "react"
import KnavListField from "./KnavListField"
import MaterialField from "./MaterialField"
import model from "./Material.model"

const PlacesListField = (props) => {

    const schema = {
        "type": "array",
        "items": model.schema
    }

    const uiSchema = {
        ...props.uiSchema,
        "ui:search": {
            "placeholder": "Finn materiale",
            "query": {
                "entity.dataset": "64ac501d-7595-45fb-b1d9-07b74660b824"
//                "entityType": "Place"
            },
        }, 
        "items": {
            ...model.uiSchema,
            "ui:field": MaterialField
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
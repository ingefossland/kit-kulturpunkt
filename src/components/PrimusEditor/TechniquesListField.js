import React, { useState, useEffect } from "react"
import KnavListField from "./KnavListField"
import TechniqueField from "./TechniqueField"
import model from "./Technique.model"

const TechniquesListField = (props) => {

    const schema = {
        "type": "array",
        "items": model.schema
    }

    const uiSchema = {
        ...props.uiSchema,
        "ui:search": {
            "placeholder": "Finn teknikk",
            "query": {
                "entity.dataset": "79535e9b-47c7-4b91-9ec5-73f3ccd40d1a"
            },
        }, 
        "items": {
            ...model.uiSchema,
            "ui:field": TechniqueField
        }
    
    }

    return (
        <KnavListField {...props} schema={schema} uiSchema={uiSchema} />
    )

}

TechniquesListField.defaultProps = {
    formData: {
        
    }
}

export default TechniquesListField
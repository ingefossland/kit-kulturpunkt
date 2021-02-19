import React, { useState, useEffect } from "react"
import model from "./Classification.model"

const ClassificationsListField = (props) => {

    const schema = {
        "type": "array",
        "items": model.schema
    }

    const uiSchema = {
        ...props.uiSchema,
        "ui:options": {
            "sortable": true
        },
        "items": {
            "ui:field": "primusClassification"
        }
    
    }

    const { ArrayField } = props.registry.fields

    return (
        <ArrayField {...props} schema={schema} uiSchema={uiSchema} />
    )

}

ClassificationsListField.defaultProps = {
    formData: [
        
    ]
}

export default ClassificationsListField
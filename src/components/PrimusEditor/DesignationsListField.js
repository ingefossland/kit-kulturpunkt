import React, { useState, useEffect } from "react"
import model from "./Designation.model"

const DesignationsListField = (props) => {

    const schema = {
        "type": "array",
        "items": model.schema
    }

    const uiSchema = {
        ...props.uiSchema,
        "items": {
            "ui:field": "primusDesignation"
        }
    
    }

    const { ArrayField } = props.registry.fields

    return (
        <ArrayField {...props} schema={schema} uiSchema={uiSchema} />
    )

}

DesignationsListField.defaultProps = {
    formData: [
        
    ]
}

export default DesignationsListField
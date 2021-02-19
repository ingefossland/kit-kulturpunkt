import React, { useState, useEffect } from "react"
import model from "./Measure.model"

const MeasuresListField = (props) => {

    const schema = {
        "type": "array",
        "items": model.schema
    }

    const uiSchema = {
        ...props.uiSchema,
        "items": {
            "ui:field": "primusMeasure"
        }
    
    }

    const { ArrayField } = props.registry.fields

    return (
        <ArrayField {...props} schema={schema} uiSchema={uiSchema} />
    )

}

MeasuresListField.defaultProps = {
    formData: [
        
    ]
}

export default MeasuresListField
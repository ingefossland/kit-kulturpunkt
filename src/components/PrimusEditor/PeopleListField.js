import React, { useState, useEffect } from "react"
import KnavListField from "./KnavListField"
import PersonField from "./PersonField"
import model from "./Person.model"

const PeopleListField = (props) => {

    const schema = {
        "type": "array",
        "items": model.schema
    }

    const uiSchema = {
        ...props.uiSchema,
        "ui:search": {
            "placeholder": "Finn person",
            "query": {
                "entityType": "Person"
            }
        },
        "items": {
            ...model.uiSchema,
            "ui:field": PersonField,
        }
    }

    return (
        <KnavListField {...props} schema={schema} uiSchema={uiSchema} />
    )

}

PeopleListField.defaultProps = {
    formData: {
        
    }
}

export default PeopleListField
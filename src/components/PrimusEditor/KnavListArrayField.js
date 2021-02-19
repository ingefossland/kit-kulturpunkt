import React, { useState, useEffect } from "react"
import PrimusListLayout from "./KnavListLayout"
import PrimusListItemLayout from "./KnavListItemLayout"

const PrimusListArrayField = (props) => {

    const uiSchema = {
        ...props.uiSchema,
        "ui:sortable": true,
        "ui:layout": PrimusListLayout,
        "items": {
            ...props.uiSchema.items,
            "ui:layout": PrimusListItemLayout,
            "ui:variant": "base"
        }
    }

    const { ArrayField } = props.registry.fields

    return (
        <ArrayField {...props} uiSchema={uiSchema} />
    )

}

PrimusListArrayField.defaultProps = {
    formData: {
        
    }
}

export default PrimusListArrayField
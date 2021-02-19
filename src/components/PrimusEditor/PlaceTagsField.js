import React from "react"
import KnavTagsField from "./KnavTagsField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const PlacesTagsField = (props) => {

    const uiSchema = {
        "ui:title": "Steder",
        "ui:placeholder": "Legg til sted",
        ...props.uiSchema,
        "ui:locale": "no",
        "ui:query": {
            "entityType": "Place"
        },
    }

    return (
        <KnavTagsField {...props} uiSchema={uiSchema} />
    )

}

PlacesTagsField.defaultProps = {
    formData: [

    ]
}

export default PlacesTagsField
import React from "react"
import KnavTagsField from "./KnavTagsField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const PeopleTagsField = (props) => {

    const uiSchema = {
        "ui:title": "Personer",
        "ui:placeholder": "Legg til person",
        ...props.uiSchema,
        "ui:locale": "no",
        "ui:query": {
            "entityType": "Person"
        },
    }

    return (
        <KnavTagsField {...props} uiSchema={uiSchema} />
    )

}

PeopleTagsField.defaultProps = {
    formData: [

    ]
}

export default PeopleTagsField
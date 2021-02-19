import React from "react"
import KnavTagsField from "./KnavTagsField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const MaterialTagsField = (props) => {

    const uiSchema = {
        "ui:title": "Materiale",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "64ac501d-7595-45fb-b1d9-07b74660b824"
        },
    }

    return (
        <KnavTagsField {...props} uiSchema={uiSchema} />
    )

}

MaterialTagsField.defaultProps = {
    formData: [

    ]
}

export default MaterialTagsField
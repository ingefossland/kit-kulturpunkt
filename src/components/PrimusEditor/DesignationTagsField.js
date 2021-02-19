import React from "react"
import KnavTagsField from "./KnavTagsField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const DesignationTagsField = (props) => {

    const uiSchema = {
        "ui:title": "Betegnelse",
        ...props.uiSchema,
        "ui:locale": "no",
        "ui:placeholder": "Legg til betegnelse",
        "ui:query": {
            "entity.dataset": "a05e6cbb-26db-4861-a9fe-68857c2e707d"
        },
    }

    return (
        <KnavTagsField {...props} uiSchema={uiSchema} />
    )

}

DesignationTagsField.defaultProps = {
    formData: [

    ]
}

export default DesignationTagsField
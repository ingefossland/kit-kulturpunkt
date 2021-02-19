import React from "react"
import KnavTagsField from "./KnavTagsField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const TechniqueTagsField = (props) => {

    const uiSchema = {
        "ui:title": "Teknikk",
        "ui:field": "knavSearchField",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "79535e9b-47c7-4b91-9ec5-73f3ccd40d1a"
        },
    }

    return (
        <KnavTagsField {...props} uiSchema={uiSchema} />
    )

}

TechniqueTagsField.defaultProps = {
    formData: [

    ]
}

export default TechniqueTagsField
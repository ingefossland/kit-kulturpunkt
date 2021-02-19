import React, { useState, useEffect } from "react"

import PersonRoleField from "./PersonRoleField"
import PersonStatusField from "./PersonStatusField"

import KnavSearchField from "./KnavSearchField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const MaterialField = (props) => {

    const EndAdornment = () => {

        return (
            <>
                <PersonStatusField {...props} />
                <PersonRoleField {...props} />
            </>
        )
        
    }

    const uiSchema = {
        "ui:title": "Teknikk",
        "ui:field": "knavSearchField",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "79535e9b-47c7-4b91-9ec5-73f3ccd40d1a"
        },
//        "ui:endAdornment": <EndAdornment />,
        ...props.uiSchema,
    }

    return (
        <KnavSearchField {...props} uiSchema={uiSchema} />
    )

}

MaterialField.defaultProps = {
    formData: {
        
    }
}

export default MaterialField
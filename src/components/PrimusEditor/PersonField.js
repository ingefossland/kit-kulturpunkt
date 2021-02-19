import React, { useState, useEffect } from "react"

import PersonRoleField from "./PersonRoleField"
import PersonStatusField from "./PersonStatusField"

import KnavSearchField from "./KnavSearchField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const PersonField = (props) => {

    const EndAdornment = () => {

        return (
            <>
                <PersonStatusField {...props} />
                <PersonRoleField {...props} />
            </>
        )
        
    }

    const uiSchema = {
        "ui:title": "Person",
        "ui:icon": "person",
        "ui:field": "knavSearchField",
        "ui:locale": "no",
        "ui:query": {
            "entityType": "Person"
        },
//        "ui:endAdornment": <EndAdornment />,
        ...props.uiSchema,
    }

    return (
        <KnavSearchField {...props} uiSchema={uiSchema} />
    )

}

PersonField.defaultProps = {
    formData: {
        
    }
}

export default PersonField
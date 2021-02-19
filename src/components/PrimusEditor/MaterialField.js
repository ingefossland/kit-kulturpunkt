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
        "ui:title": "Materiale",
        "ui:field": "knavSearchField",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "64ac501d-7595-45fb-b1d9-07b74660b824"
//            "entityType": "Person"
        },
//        "ui:endAdornment": <EndAdornment />,
        ...props.uiSchema,
    }

    const { LayoutField } = props.registry.fields

    return (
        <LayoutField {...props} uiSchema={uiSchema}>
            <KnavSearchField {...props} uiSchema={uiSchema} />
        </LayoutField>
    )

}

MaterialField.defaultProps = {
    formData: {
        
    }
}

export default MaterialField
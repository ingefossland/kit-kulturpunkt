import React, { useState, useEffect } from "react"

import PersonRoleField from "./PersonRoleField"
import PersonStatusField from "./PersonStatusField"

import KnavSearchField from "./KnavSearchField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const DesignationField = (props) => {

    const EndAdornment = () => {

        return (
            <>
                <PersonStatusField {...props} />
                <PersonRoleField {...props} />
            </>
        )
        
    }

    const uiSchema = {
        "ui:title": "Betegnelse",
        "ui:field": "knavSearchField",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "a05e6cbb-26db-4861-a9fe-68857c2e707d"
        },
        ...props.uiSchema,
    }

    return (
        <KnavSearchField {...props} uiSchema={uiSchema} />
    )

}

DesignationField.defaultProps = {
    formData: {
        
    }
}

export default DesignationField
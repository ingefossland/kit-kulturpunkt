import React, { useState, useEffect } from "react"
import PlaceStatusField from "./PlaceStatusField"
import KnavSearchField from "./KnavSearchField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const PersonField = (props) => {

    const EndAdornment = () => {

        return (
            <>
                <PlaceStatusField {...props} />
            </>
        )
        
    }

    const uiSchema = {
        "ui:title": "Sted",
//        "ui:icon": "person",
        "ui:field": "knavSearchField",
        "ui:locale": "no",
        "ui:query": {
            "entityType": "Place"
        },
        "ui:endAdornment": <EndAdornment />,
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
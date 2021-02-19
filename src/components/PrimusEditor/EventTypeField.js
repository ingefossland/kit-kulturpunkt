import React, { useState, useEffect } from "react"
import KnavSearchField from "./KnavSearchField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const EventTypeField = (props) => {

    const uiSchema = {
        "ui:title": "Hendelsestype",
        "ui:icon": "person",
        "ui:field": "knavSearchField",
        "ui:locale": "no",
        "ui:query": {
            "entityType": "Person"
        },
        ...props.uiSchema,
    }

    return (
        <KnavSearchField {...props} uiSchema={uiSchema} />
    )

}

EventTypeField.defaultProps = {
    formData: {
        
    }
}

export default EventTypeField
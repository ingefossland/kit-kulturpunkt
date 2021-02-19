import React, { useState, useEffect } from "react"
import event from "./Event.model"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState, toIdSchema } = utils

const PrimusEventsField = (props) => {


    const Layout = ({children}) => {
        return children
    }

    const uiSchema = {
        "ui:layout": Layout,
        "items": event.uiSchema
    }

    const { ArrayField } = props.registry.fields


    return <ArrayField {...props} uiSchema={uiSchema} />

}

export default PrimusEventsField
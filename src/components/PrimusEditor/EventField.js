import React, { useState, useEffect } from "react"
import model from "./Event.model"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const EventField = (props) => {

    const { ObjectField } = props.registry.fields

    const schema = {
        ...model.schema,
    }

    const uiSchema = {
        ...model.uiSchema,
    }

    return (
        <ObjectField {...props} schema={schema} uiSchema={uiSchema} />
    )

}

EventField.defaultProps = {
    formData: {
        
    }
}

export default EventField
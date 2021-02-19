import React, { useState } from 'react';
import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

const PrimusMediaSectionField = (props) => {

    const uiSchema = {
        ...props.uiSchema,
        "ui:layout": "primusMediaSection",
        "ui:options": {
            "spacing": 2
        },
        "ui:field": undefined,
    }

    const { SchemaField } = props.registry.fields;

    return (
        <SchemaField {...props} uiSchema={uiSchema} />
    )
    
}

export default PrimusMediaSectionField;
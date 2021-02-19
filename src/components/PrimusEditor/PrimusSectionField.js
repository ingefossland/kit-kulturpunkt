import React, { useState } from 'react';
import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

const PrimusSectionField = (props) => {

    const uiSchema = {
        ...props.uiSchema,
        "ui:layout": "primusSection",
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

export default PrimusSectionField;

import React, { Component } from 'react';
import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

const GeopointField = (props) => {
    const { registry, schema, uiSchema, formData, formContext } = props
    const { ObjectField } = registry.fields;

    const _onChange = (formData) => {
 
        const newFormData = getDefaultFormState(schema, formData)
        
        console.log('GeopointField:onChange', newFormData)

        if (props.onChange) {
            props.onChange(newFormData);
        }
        
    }   
    const newUiSchema = {
        ...uiSchema,
        "ui:location": formData || {},
        "ui:onChange": _onChange
    }

    return (
        <ObjectField {...props} onChange={_onChange} uiSchema={newUiSchema} />
    )

}

export default GeopointField;
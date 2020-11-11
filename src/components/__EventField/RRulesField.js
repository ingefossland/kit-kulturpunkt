import React, { useState, useEffect } from "react"
import model from "./RRulesField.model"

import { getRRuleFromFormData, getFormDataFromRRule } from "./utils"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const RRulesField = (props) => {

    const schema = {
        ...model.schema,
        ...props.schema
    }

    const uiSchema = {
        ...model.uiSchema,
        ...props.uiSchema
    }

    const getFormData = (formData) => {

        if (props.schema.type === "string") {
            return getFormDataFromRRule(formData)
        } else {
            return getDefaultFormState(schema, formData)
        }
        
    }

    const [formData, setFormData] = useState(getFormData(props.formData))

    // onChange

    const _onChange = (formData) => {
        setFormData(formData)

        if (props.schema.type === "string") {
            props.onChange(getRRuleFromFormData(formData))
        } else {
            props.onChange(formData)
        }

    }

    // formData

    const { ObjectField } = props.registry.fields;

    return (
        <ObjectField 
            {...props}
            formData={formData}
            schema={schema}
            uiSchema={uiSchema}
            onChange={_onChange} />
    )

}

RRulesField.defaultProps = {
    formData: {
        
    }
}

export default RRulesField
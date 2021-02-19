import React, { useState, useEffect } from "react"
import model from "./RRules.model"

import { getRRuleFromFormData, getFormDataFromRRule } from "./utils"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const RRulesField = (props) => {

    const schema = {
        ...model.schema
    }

    const getUiSchema = (formData) => {

        const { freq } = formData

        let uiFieldset = [
            "frequency",
            "ends"
        ]

        if (freq === "YEARLY" || freq === "MONTHLY" ) {
            uiFieldset = [
                "frequency",
                "byDate",
                "bySetPos",
                "ends"
            ]
        } else if (freq === "WEEKLY" || freq === "MINUTELY") {
            uiFieldset = [
                "frequency",
                "byWeekday",
                "ends"
            ]
        }        

        return {
            ...model.uiSchema,
//            ...props.uiSchema,
            "ui:field": undefined,
            "ui:fieldset": uiFieldset
        }

    }

    const getFormData = (formData) => {

        if (props.schema.type === "string") {
            return getFormDataFromRRule(formData)
        } else {
            return getDefaultFormState(schema, formData)
        }
        
    }

    const [formData, setFormData] = useState(getFormData(props.formData))

    const _onBlur = () => {}
    const _onFocus = () => {}

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

    const { SchemaField } = props.registry.fields;

    return (
        <SchemaField 
            registry={props.registry}
            idSchema={props.idSchema}
            formData={formData}
            schema={schema}
            uiSchema={getUiSchema(formData)}
            onFocus={_onFocus}
            onBlur={_onBlur}
            onChange={_onChange} />
    )

}

RRulesField.defaultProps = {
    formData: {
        
    }
}

export default RRulesField
import React, { useState, useEffect } from "react"
import moment from "moment"
import model from "./Dating.model"

import TextFieldPopper from "./TextFieldPopper"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const DateRangeField = (props) => {

    const { formData, idSchema } = props
    const { dtStart, dtEnd } = props.formData
    
    let description;

    if (dtStart && dtEnd && dtStart !== dtEnd) {
       description = moment(dtStart).format("YYYY-MM-DD") + "–" + moment(dtEnd).format("YYYY-MM-DD")
    } else if (dtStart) {
        description = moment(dtStart).format("YYYY-MM-DD")
    }

    const schema = {
        ...props.schema,
        properties: {
            ...props.schema.properties,
            ...model.schema.properties,
        }
    }

    const uiSchema = {
        ...model.uiSchema,
        ...props.uiSchema,
        "ui:field": undefined,
    }

    const _onChange = (formData) => {
        let { dtStart, dtEnd } = formData

        let values = []

        if (dtStart && dtEnd && dtStart !== dtEnd) {
            values = [dtStart,dtEnd]
        } else if (dtStart) {
            values = [dtStart]
        }

        const value = values && values.join("–")

        formData = {
            ...formData,
            dtStart: dtStart,
            dtEnd: dtEnd,
            value: value
        }

        props.onChange(formData)
        
    }

    const _onInputChange = (event) => {

        const value = event.target.value
        const parts = value.split('-') || []

        const dtStart = parts[0]
        const dtEnd = parts[1] || null

        props.onChange({
            dtStart: dtStart,
            dtEnd: dtEnd,
            value: value
        })

    }

    const { ObjectField } = props.registry.fields

    const uiOptions = getUiOptions(uiSchema)

    const id = idSchema.value.$id
    const value = formData.value
    const label = uiOptions.title
    const helperText = uiOptions.help

    return (
        <TextFieldPopper id={id} value={value} label={label} helperText={helperText} onChange={_onInputChange}>
            <ObjectField {...props} schema={schema} uiSchema={uiSchema} onChange={_onChange} />
        </TextFieldPopper>
    )



}

export default DateRangeField
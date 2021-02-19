import React, { useState, useEffect } from "react"
import moment from "moment"
import model from "./Measure.model"

import MeasureTypeField from "./MeasureTypeField"
import TextFieldPopper from "./TextFieldPopper"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const MeasureField = (props) => {

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
        let { width, height, depth, unit } = formData

        let values = []

        if (width && height && depth) {
            values = [width, height, depth]
        } else if (width && height) {
            values = [width, height]
        } else if (width) {
            values = [width]
        }

        let value = values && values.join('x')

        if (unit) {
            value = value + unit
        }

        formData = {
            ...formData,
            value: value
        }

        props.onChange(formData)
        
    }

    const units = schema.properties.unit.enum

    const _onInputChange = (event) => {

        const value = event.target.value

        const numberValue = value.replace(/,/g, '.')

        const split = numberValue && numberValue.split("x") || []

        const width = split && split[0] && parseFloat(split[0])
        const height = split && split[1] && parseFloat(split[1])
        const depth = split && split[2] && parseFloat(split[2])

        const unitValue = split && split.length && split[split.length-1]
    
        const unit = unitValue && unitValue.replace(/[0-9,.]/g, '')
    
        props.onChange({
            width: width,
            height: height,
            depth: depth,
            unit: unit,
            value: value
        })

    }

    const { LayoutField, ObjectField } = props.registry.fields

    const uiOptions = getUiOptions(uiSchema)

    const id = idSchema.value.$id
    const value = formData.value
    const label = uiOptions.title
    const helperText = uiOptions.help

    return (
        <LayoutField {...props}>
            <TextFieldPopper id={id} value={value} label={label} helperText={helperText} onChange={_onInputChange}>
                <ObjectField {...props} schema={schema} uiSchema={uiSchema} onChange={_onChange} />
            </TextFieldPopper>
        </LayoutField>
    )



}

export default MeasureField
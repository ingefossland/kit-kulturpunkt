import React, { useState, useEffect } from "react"
import { getDefaultFormState } from "../../utils"
import model from "./MeasureField.model"

import { getMeasureString, getMeasureArray } from "./utils"

const MasureField = ({onChange, ...props}) => {
    const [text, setText] = useState(null)
    const [list, setList] = useState(props.formData || [])

    useEffect(() => {

        if (props.schema.type === "array") {
            setList(props.formData || [])
            setText(getMeasureString(props.formData || []))
        }

        if (props.schema.type === "string") {
            setText(props.formData)
            setList(getMeasureArray(props.formData))
        }

    }, [])

    useEffect(() => {
        if (props.schema.type === "array") {
            onChange && onChange(list)
        } else if (props.schema.type === "string") {
            onChange && onChange(text)
        }

    }, [list.length])

    const _onChange = (formData) => {

        if (formData.text && formData.text !== text) {
            setText(formData.text)
            setList(getMeasureArray(formData.text))
        }

        if (formData.list && formData.list !== list) {
            setList(formData.list)
            setText(getMeasureString(formData.list))
        }

    }

    const schema = {
        ...model.schema
    }

    const uiSchema = {
        ...model.uiSchema
    }

    const formData = {
        text: text,
        list: list
    }

    const { ObjectField } = props.registry.fields;

    return (
        <ObjectField {...props} schema={schema} uiSchema={uiSchema} formData={formData} onChange={_onChange} />
    )

}

MasureField.defaultProps = {
    formData: {}
}

export default MasureField
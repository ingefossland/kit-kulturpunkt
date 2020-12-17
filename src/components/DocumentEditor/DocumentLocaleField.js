import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ISO6391 from 'iso-639-1'

import { utils } from "@rjsf/core";
const { getUiOptions } = utils;

const LocaleField = (props) => {
    const { formData, formContext, schema, uiSchema } = props;

    const uiOptions = getUiOptions(uiSchema)
    const uiQuery = uiOptions.query || {}

    const pathname = useSelector(state => state.editor.pathname)
    const languages = useSelector(state => state.app.languages)

    const [enumOptions, setEnumOptions] = useState([formData])
    const [enumNames, setEnumNames] = useState([formData])

    const getOptions = () => {

        let optionsEnum = [
        ], optionsNames = [
        ]

        languages && languages.map(lang => {
            const label = ISO6391.getNativeName(lang) + " ("+lang+")" || lang
            optionsEnum.push(lang)
            optionsNames.push(label)
        })

        setEnumOptions(optionsEnum)
        setEnumNames(optionsNames)

    }

    useEffect(() => {
        getOptions()
    }, [languages])

    const { SchemaField } = props.registry.fields;

    const newSchema = {
        ...schema,
        enum: enumOptions,
        enumNames: enumNames,
        default: null
    }

    const newUiSchema = {
        ...uiSchema,
        "ui:field": undefined
    }

    return (
        <SchemaField {...props} schema={newSchema} uiSchema={newUiSchema} />
    )

}

export default LocaleField
import React from 'react';
import LocalizedStringSettings from "./LocalizedStringSettings"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

/** Localized string  */

const LocalizedStringField = (props) => {
    const { schema, uiSchema, formContext } = props;
    const uiOptions = getUiOptions(uiSchema)

    const languages = formContext.languages || ["en"];
    const defaultLocale = formContext.defaultLocale || languages[0]
    const currentLocale = formContext.currentLocale || defaultLocale

    const getUiSchema = () => {

        let localizedUiSchema = {
            "ui:fieldset": [
                "locale:"+currentLocale
            ]
        }
    
        Object.keys(schema.properties).map(name => {
            const localeProps = name.split(':')
            const locale = localeProps[1]

            const title = uiOptions.title && uiOptions.title + ":" + locale;
            const help = uiOptions.help;

            const endAdornment = <LocalizedStringSettings {...props} />

            localizedUiSchema[name] = {
                ...uiSchema,
                "ui:field": undefined,
                "ui:options": {
                    "endAdornment": endAdornment,
                    "widget": uiOptions.widget || "text",
                    "title": title, 
                    "language": locale,
                    "help": help,
                },
            }
        
        })
    
        return {
            ...localizedUiSchema,
            "ui:collapsible": true,
            "ui:expanded": false
        }
        
    }

    const { SchemaFieldset } = props.registry.fields;

    const newUiSchema = getUiSchema()
    const newUiOptions = getUiOptions(newUiSchema)

    return (
        <SchemaFieldset  {...props} uiSchema={newUiSchema} fieldset={newUiOptions.fieldset} />
    )

}

export default LocalizedStringField;
import React from "react"
import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

const ReferenceField = (props) => {
    const { schema, idSchema, uiSchema = {}, formData = {}, formContext } = props;
    const { referenceId, reference = {} } = formData;

    const uiOptions = getUiOptions(uiSchema)

    const getUiButtons = () => {
        const buttons = uiOptions && uiOptions.buttons || ["save","edit"]

        const buttonProps = {
            ...props,
            referenceId: referenceId,
            reference: reference,
            id: idSchema && idSchema.$id
        }

        const { onSave, onEditReference, onDialog, onUpload } = formContext

        let uiButtons = []
        
        buttons.map(button => {

            if (typeof button === "string") {
                button = {
                    type: button,
                    title: button.charAt(0).toUpperCase() + button.slice(1)
                }
            }

            const { type = "button" } = button

            if (type === "save") {
                button.onClick = () => onSave && onSave(buttonProps)
            } else if (type === "edit") {
                button.onClick = () => onEditReference && onEditReference(buttonProps)
            }

            /*
            if (type === "dialog" || type === "sidebar") {
                button.onClick = () => onDialog && onDialog(buttonProps)
            } else if (type === "upload") {
                button.onClick = () => onUpload && onUpload(buttonProps)
            }
            */

            button = {
                ...button,
                type: "button",
                disabled: props.disabled || props.readonly
            }

            uiButtons.push(button)
        })

        return uiButtons

    }

    const getUiSchema = () => {

        let fieldset = uiOptions.fieldset || []

        if (!uiOptions.fieldset && schema.properties) {
            
            Object.keys(schema.properties).map(name => {
                
                const type = schema.properties[name] && schema.properties[name].type || undefined;
                
                if (type === "object") {
                    fieldset.push(name)
                }

                if (type === "array") {
                    fieldset.push(name)
                }
                
            })
            
        }

        let uiReference, uiContent

        if (fieldset && fieldset.includes('reference')) {
            const uiSchemaReference = uiSchema && uiSchema.reference;
            uiReference = {
                "ui:title": "Reference",
                ...uiSchemaReference
            }

        }

        if (fieldset && fieldset.includes('content')) {
            const uiSchemaContent = uiSchema && uiSchema.content;
            uiContent = {
                "ui:title": "Innhold",
                ...uiSchemaContent
            }
        }

        const layout = uiOptions.layout || "module"

        return {
            "ui:editable": true,
            "ui:deletable": referenceId && true,
            "ui:restorable": referenceId && true,
            "ui:removable": !referenceId && true,
            "ui:layout": layout,
            "ui:fieldset": fieldset,
            "ui:buttons": getUiButtons(),
            "ui:nav": "tabs",
            "reference": uiReference,
            "content": uiContent,
            "ui:preview": {
                "select": {
                    "_action": "_action",
                    "type": "type",
                    "title": "title",
                    "description": "description",
                    "imageUrl": "imageUrl",
                    "status": "status",
                    "referenceId": "referenceId",
                    "reference": "reference"
                },
                prepare({formData = {}}) {
                    const { _action, reference, referenceId } = formData;
            
                    let status = reference && reference.status;
            
                    if (_action === "delete") {
                        status = "trash"
                    }
            
                    return {
                        _action: _action,
                        type: reference && reference.documentType,
                        title: reference && reference.title,
                        description: reference && reference.description,
                        imageUrl: reference && reference.imageUrl,
                        status: status,
                        referenceId: referenceId,
                        reference: reference
                    }
                }                
            },
            ...uiSchema,
        }
        
    }

    const _onChange = (formData) => {
        const { _action, referenceId, reference = {} } = formData;

        // if no referenceId, action = "create"

        if (!referenceId) {
            formData._action = "create"
        }

        // if reference dont have a uniqueId, action = "create"

        if (!reference) {
            formData.reference = {}
        }

        if (!reference.uniqueId) {
            formData.reference._action = "create"
        }

        props.onChange && props.onChange(formData)


    }


    const { ObjectField } = props.registry.fields

    const newUiSchema = getUiSchema()

    return (
        <ObjectField {...props} uiSchema={newUiSchema} onChange={_onChange} />
    )

}

export default ReferenceField
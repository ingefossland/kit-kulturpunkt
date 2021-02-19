import _ from "lodash";
import { utils } from "@rjsf/core";
const { getUiOptions, retrieveSchema, getDefaultFormState, toIdSchema } = utils;

export const getUiFieldset = (props) => {
    const { idSchema, idPrefix, schema, uiSchema, formData, formContext } = props
    const { rootSchema } = props.registry

    const currentId = formContext && formContext.currentId
    const uiOptions = getUiOptions(uiSchema)

    const { fieldset } = uiOptions

    if (!fieldset) {
        return false
    }
 
    let uiFieldset = []

    const getFieldByName = (name) => {

        const fieldSchema = schema && schema.properties && schema.properties[name] && retrieveSchema(schema.properties[name], props.registry.definitions, formData && formData[name])
        const fieldFormData = fieldSchema && formData && formData[name] && getDefaultFormState(fieldSchema, formData && formData[name])
        const fieldUiSchema = uiSchema && uiSchema[name] || {}
        const fieldUiOptions = fieldUiSchema && getUiOptions(fieldUiSchema)

        const fieldIdPrefix = idSchema.$id + "_" + name;
        const fieldSelected = currentId && currentId.startsWith(fieldIdPrefix)

        if (fieldSchema) {

            const fieldIdSchema = toIdSchema(
                fieldSchema,
                fieldIdPrefix,
                rootSchema,
                fieldFormData,
                idPrefix
            );
    
            return {
                ...props,
                idPrefix: fieldIdPrefix,
                idSchema: fieldIdSchema,
                name: name,
                schema: fieldSchema,
                uiSchema: {
                    ...fieldUiSchema,
                    "ui:selected": fieldSelected
                },
                uiOptions: fieldUiOptions,
                formData: fieldFormData,
                onChange: (value) => props.onChange({...formData, [name]: value})
            }
        }

        if (fieldUiSchema && fieldUiOptions.fieldset) {

            const fieldIdSchema = toIdSchema(
                schema,
                fieldIdPrefix,
                rootSchema,
                formData,
                idPrefix
            );
            
            return {
                ...props,
                idPrefix: fieldIdPrefix,
                idSchema: fieldIdSchema,
                name: name,
                schema: schema,
                uiSchema: {
                    ...fieldUiSchema,
                    "ui:selected": fieldSelected
                },
                uiOptions: fieldUiOptions,
                formData: formData
            }
        }

    }

    let selected

    fieldset.map((name, index) => {
        const field = getFieldByName(name)

        if (field) {
            uiFieldset.push(field)

            if (field.uiSchema["ui:selected"]) {
                selected = true
            }
    
        }

    })

    if (uiFieldset[0] && !selected) {
        uiFieldset[0].uiSchema = {
            ...uiFieldset[0].uiSchema,
            "ui:selected": true
        }
    }


    return uiFieldset
    
}

export default getUiFieldset
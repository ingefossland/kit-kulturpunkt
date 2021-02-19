import { utils } from "@rjsf/core";
const { getUiOptions } = utils

export function getPreviewLocalizedString(localizedString, props) {
    const { formContext } = props;
    const currentLocale = formContext && formContext.currentLocale || formContext && formContext.languages && formContext.languages[0]

    if (!currentLocale) {
        return
    }

    const localeId = "locale:"+currentLocale;

    return localizedString && localizedString[localeId]

}

export function getPreviewFilters(value, props) {
    const { schema, formData, index } = props;

    if (schema && schema.type === "array" && formData && formData.length) {
        value = value && value.replace("{count}", formData.length)
    } else if (index) {
        value = value && value.replace("{count}", index+1)
        value = value && value.replace("{index}", index)
    }
 
    return value;

}

export function getPreviewData(preview, props) {
    const { schema, formData } = props;
    const { select, prepare, single, plural, empty } = preview

    let selection;
  
    if (prepare && typeof prepare === "function") {
        selection = prepare(props)
    } else if (prepare) {
        selection = prepare
    } else {
        selection = formData
    }


    let data = {}
  
    if (select) {
        Object.keys(select).map(name => {

            let key = select[name] || name

            let value = null;

            if (select.hasOwnProperty(key) && selection && selection[key]) {
                value = selection[key];
            }

            if (typeof value === "object" && value !== null && schema && schema.type === "array") {
                if (formData && formData.length && formData.length > 1 && value.plural) {
                    value = value.plural
                } else if (formData && formData.length && formData.length === 1 && value.single) {
                    value = value.single
                } else if (value.empty) {
                    value = value.empty
                }
            }

            /*

            if (typeof value === "object" && value !== null) {
                value = getPreviewLocalizedString(value, props)
            }

            */

            if (value && typeof value === "string") {
                value = getPreviewFilters(value, props)
            }

            if (name === "metadata" && selection[key]) {
                data[name] = selection[key]
            }

            if (value) {
                data[name] = value
            }

        })
    }

    return data;
  
}

export const getUiPreview = ({ schema, uiSchema = {}, formData, formContext, index }) => {
    const uiOptions = getUiOptions(uiSchema)

    const previewData = {
        schema: schema,
        formData: formData,
        formContext: formContext,
        index: index
    }

    if (uiOptions.preview) {
        return getPreviewData(uiOptions.preview, previewData);
    }


}

export default getUiPreview


import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { utils } from "@rjsf/core";
const { getUiOptions } = utils;

const PageEditorField = (props) => {
    const { idSchema, schema, uiSchema, formData, formContext, registry } = props;
    const { uniqueId, status, statusCode, statusMessage, title, createdAt, updatedAt, deletedAt } = formData;
    const { isLoading, isSaving, currentId, currentLocale, onExpand, onCollapse, onSelect, onLocale, onSubmit } = formContext;

    const { t, i18n } = useTranslation(['editor'])

    const getPrimaryAction = () => {

        if (isLoading) {
            return {
                label: t("Loading") + " ...",
                disabled: true
            }
        } else if (isSaving) {
            return {
                label: t("Saving") + " ...",
                disabled: true
            }
        }

        let primary = {
            role: "group",
            children: [
                {
                    label: t("Save as draft"),
                    onClick: (event) => onSubmit({formData: {...formData, status: "draft"}}, event),
                },
                {
                    label: t("Save and publish"),
                    onClick: (event) => onSubmit({formData: {...formData, status: "publish"}}, event),
                },
            ]
        }

        let secondary = {
            role: "group",
            children: [
                {
                    label: t("Save and exit"),
                }
            ]

        }

        if (uniqueId) {
            secondary.children.push({
                label: t("Save as") + " ...",
                onClick: (event) =>  onSubmit({formData: {...formData, status: "copy"}}, event),
            })
        }
        

        return {
            type: "save",
            label: t("Save"),
            onClick: (event) => onSubmit({formData}, event),
            children: [
                primary,
                secondary
            ]
        }
    
    }

    // primary + secondary actions

    const primaryAction = formContext.primaryAction || getPrimaryAction()

    // toggle fieldset

    const uiOptions = getUiOptions(uiSchema)

    const { fieldset } = uiOptions

    const idPrefix = idSchema && idSchema.$id
    const primaryId = fieldset && fieldset[0] && idPrefix + "_" + fieldset[0]
    const secondaryId = fieldset && fieldset[1] && idPrefix + "_" + fieldset[1]
    const expanded = secondaryId && currentId && currentId.startsWith(secondaryId)

    const _onToggle = () => {

        if (!expanded) {
            secondaryId && onExpand && onExpand({id: secondaryId})
        } else {
            primaryId && onExpand && onExpand({id: ""})
        }

    }

    const defaultLocale = formContext.defaultLocale || formContext.languages && formContext.languages[0]
//    const [currentLocale, setCurrentLocale] = useState(defaultLocale)

    const _onLocale = (locale) => {


        onLocale && onLocale(locale)
//        setCurrentLocale(locale)
    }

    const newUiSchema = {
        ...uiSchema,
        "ui:title": title,
        "ui:expanded": expanded,
        "ui:primaryAction": primaryAction,
        "ui:status": status,
        "ui:statusDate": updatedAt || createdAt || deletedAt,
        "ui:statusCode": statusCode,
        "ui:statusMessage": statusMessage,
        "ui:layout": "pageEditor",
        "ui:onSelect": (item) => onSelect(item),
        "ui:currentLocale": currentLocale,
        "ui:onLocale": (locale) => _onLocale(locale),
        "ui:onToggle": () => _onToggle()
    }

    const { ObjectField } = registry.fields;

    const newRegistry = {
        ...registry,
        formContext: {
            ...formContext,
            currentLocale: currentLocale
        }
    }

    return (
        <ObjectField {...props} registry={newRegistry} uiSchema={newUiSchema} />
    )

}

export default PageEditorField;
import React, { useState } from 'react';
import { getUiMenu, getPrimusEventsMenu, getPrimusMediaMenu } from "./utils"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

const PrimusEditorContentField = (props) => {
    const { formData, formContext } = props
    const { uniqueId, currentId, onCurrentId, _onEventAddClick, _onUploadClick } = formContext

    const currentParents = currentId && currentId && currentId.split("_")
    const currentSection = currentParents && currentParents[2] || "basis"
    const currentName = currentParents && currentParents[currentParents.length-1] || "basis"

    const _onSelect = ({id, onClick, url, pathname}) => {

        if (id && id.includes("media_")) {
            id = id.replace("media_", "")
        }

        onClick && onClick()
        id && onCurrentId(id)
    }

    const uiOptions = getUiOptions(props.uiSchema)

    let uiMenu

    if (uniqueId) {

        uiMenu = getUiMenu(props)

        uiMenu = uiMenu.map(item => {

            if (item.name === "events") {
                return getPrimusEventsMenu({...props, parent: item, onAdd: _onEventAddClick})
            }

            if (item.name === "media") {
                return getPrimusMediaMenu({...props, parent: item, onAdd: _onUploadClick})
            }

            return item

        })
    
    }

    let preview = {
        ...formContext.preview,
        hidden: false
    }

    let uiFieldset

    if (!uniqueId) {
        uiFieldset = ["basis"]
    } else if (currentSection === "images" || currentSection === "attachments") {
        uiFieldset = [currentSection]
        preview.hidden = true
    } else {
        uiFieldset = uiOptions.fieldset
    }

    let uiSchema = {
        ...props.uiSchema,
        "ui:layout": "primusContent",
        "ui:menu": uiMenu,
        "ui:preview": preview,
        "ui:onSelect": _onSelect,
        "ui:fieldset": uiFieldset,
    }


    const { ObjectField } = props.registry.fields;

    return (
        <ObjectField {...props} uiSchema={uiSchema} />
    )
    
}

export default PrimusEditorContentField;
import React, { useState, useEffect } from "react"
import MediaArrayTemplate from "./PrimusMediaArrayTemplate"
import model from "./PrimusMedia.model"

import ImageEditorField from "./ImageEditorField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState, toIdSchema } = utils

const PrimusMediaEditorField = (props) => {
    const { idSchema, formData, formContext, onChange } = props

    const { currentId, onCurrentId } = formContext

    const _onSelectIndex = (index) => {
        const itemId = idSchema.$id + "_" + index
        onCurrentId && onCurrentId(itemId)
    }

    const { ArrayField } = props.registry.fields

    let selectedItem

    const items = formData.map((item, index) => {

        const itemId = idSchema.$id + "_" + index

        let selected = false

        if (currentId && currentId.startsWith(itemId)) {
            selected = true
            selectedItem = item
        }

        return {
            ...item,
            selected: selected,
            onSelect: () => _onSelectIndex(index)
        }

    })

    if (!selectedItem && items.length) {
        items[0] = {
            ...items[0],
            selected: true
        }
    }

    const uiSchema = {
        "ui:ArrayFieldTemplate": MediaArrayTemplate,
        "items": {
            ...model.uiSchema.items,
            "ui:items": items,
            "ui:field": ImageEditorField,
        }
    }

    return <ArrayField {...props} uiSchema={uiSchema} />

}

export default PrimusMediaEditorField
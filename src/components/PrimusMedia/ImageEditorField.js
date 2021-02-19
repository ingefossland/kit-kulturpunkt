import React, { useState } from 'react';
import ImageEditorLayout from "./ImageEditorLayout"
import model from "./ImageEditor.model"

import PrimusMediaTheme from "./PrimusMediaTheme"

const ImageEditorField = (props) => {

    const { idSchema, formData, formContext, onChange } = props
    const idPrefix = idSchema.$id

    const { currentId, onCurrentId } = formContext

    const idParents = idPrefix && idPrefix.split("_") || []
    const currentIdParents = currentId && currentId.split("_") || []

    let fieldset

    if (currentIdParents.length > idParents.length) {
        fieldset = currentIdParents[idParents.length]
    }

    const _onSelectIndex = (index) => {

        let idParents = idPrefix && idPrefix.split("_")
        idParents.pop()

        let idParent = idParents.join('_') + "_" + index

        let id

        if (fieldset) {
            id = idParent + "_" + fieldset
        } else {
            id = idParent
        }

        onCurrentId && onCurrentId(id)

    }

    const _onFieldset = (fieldset) => {

        let id

        if (fieldset) {
            id = idPrefix + "_" + fieldset
        } else {
            id = idPrefix
        }

        onCurrentId && onCurrentId(id)

    }

    const _onAnnotationsChange = (imageAnnotations = []) => {
        onChange && onChange({
            ...formData,
            imageAnnotations: imageAnnotations
        })
    }

    const _onCropChange = (imageCropdata = {}) => {
        onChange && onChange({
            ...formData,
            imageCropdata: imageCropdata
        })
    }

    const [transform, setTransform] = useState({scale: 1})

    const _onTransformChange = (props) => {

        const { scale, positionX, positionY } = props

        console.log(props)

        setTransform({
            scale: scale,
            positionX: positionX,
            positionY: positionY
        })
    }

    const toolbar = [
        {
            name: "preview",
            icon: "remove_red_eye",
            onClick: () => _onFieldset()
        },
        {
            name: "content",
            icon: "edit",
            onClick: () => _onFieldset("content")
        },
        /*
        {
            name: "imageCropdata",
            icon: "crop",
            onClick: () => _onFieldset("imageCropdata")
        },*/
        {
            name: "imageAnnotations",
            icon: "label",
            onClick: () => _onFieldset("imageAnnotations")
        }
    ]

    const imageUrl = formData.media && formData.media.imageUrl
    const imageAnnotations = formData.imageAnnotations || []
    const imageCropdata = formData.imageCropdata || {}

    const uiSchema = {
        ...model.uiSchema,
        ...props.uiSchema,
        "ui:collapsible": true,
        "ui:onSelectIndex": _onSelectIndex,
        "ui:imageUrl": imageUrl,
        "ui:imageAnnotations": imageAnnotations,
        "ui:onAnnotationsChange": _onAnnotationsChange,
        "ui:imageCropdata": imageCropdata,
        "ui:onCropChange": _onCropChange,
        "ui:fieldset": [fieldset],
        "ui:action": fieldset || "preview",
        "ui:toolbar": toolbar,
        "ui:transform": transform,
        "ui:onTransformChange": _onTransformChange,
        "ui:layout": ImageEditorLayout
    }

    const { LayoutField, ObjectField } = props.registry.fields

    return (
        <PrimusMediaTheme>
            <ObjectField {...props} uiSchema={uiSchema} />
        </PrimusMediaTheme>
    )

    return (
        <LayoutField {...props} uiSchema={uiSchema}>
            <ObjectField {...props} />
        </LayoutField>
    )

}

export default ImageEditorField;
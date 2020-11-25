import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PreviewBase, PreviewOptions, PreviewJSON } from "../components"
import { PreviewMedia } from "@kit-ui/admin"

import schemasByName from "../app/schemas/schemasByName"

const MediaPreview = (props) => {
    const editor = useSelector(state => state.editor)

    const { formData } = editor
    const { mediaType } = formData

    const modelType = mediaType && "media/"+mediaType 
    const model = schemasByName && schemasByName[modelType]

    const schema = model && model.schema
    const uiSchema = model && model.uiSchema

    let previewOptions = [
        {
            "title": "JSON",
            "value": "formData",
            "template": () => <PreviewJSON>{formData}</PreviewJSON> 
        },
        {
            "title": "uiSchema",
            "value": "uiSchema",
            "template": () => <PreviewJSON>{uiSchema}</PreviewJSON> 
        },
        {
            "title": "schema",
            "value": "schema",
            "template": () => <PreviewJSON>{schema}</PreviewJSON> 
        },
    ]    

    if (mediaType) {

        previewOptions = [
            {
//                ...model.preview,
                template: () => <PreviewMedia {...formData}></PreviewMedia>,
                title: "Preview",
                value: "preview"
            },
            ...previewOptions
        ]
            
    }

    const [value, setValue] = useState(previewOptions[0].value)

    const _onChange = (value) => {
        setValue(value)
    }

    const currentPreview = previewOptions.find(option => option.value === value)
    const PreviewTemplate = currentPreview && currentPreview.template
    
    return (

        <PreviewBase>
            { PreviewTemplate && <PreviewTemplate formData={formData} /> }
            <PreviewOptions options={previewOptions} value={value} onChange={_onChange} />
        </PreviewBase>

    )

}

MediaPreview.defaultProps = {
}

export default MediaPreview
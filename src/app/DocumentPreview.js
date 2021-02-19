import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    PreviewBase, 
    PreviewOptions, 
    PreviewJSON
} from "@kit-ui/admin"

import { schemasByName } from "./schemas"

import DocumentPreviewCols from "./DocumentPreviewCols"

const DocumentPreview = () => {
    const editor = useSelector(state => state.editor)

    const { formData } = editor
    const { documentType } = formData

    const modelType = documentType && "documents/"+documentType 
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

    if (model.preview && model.preview.template) {

        previewOptions = [
            {
                ...model.preview,
//                template: DocumentPreviewCols,
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

    const formContext = {}
    
    return (
        <PreviewBase>
            <PreviewTemplate formContext={formContext} formData={formData} />
            <PreviewOptions options={previewOptions} value={value} onChange={_onChange} />
        </PreviewBase>
    )

}

DocumentPreview.defaultProps = {
}

export default DocumentPreview
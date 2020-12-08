import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    PreviewBase, 
    PreviewOptions, 
    PreviewJSON
} from "@kit-ui/admin"

import schemasByName from "../schemas/schemasByName"

const CollectionPreview = (props) => {
    const editor = useSelector(state => state.editor)

    const { formData, formContext } = editor
    const { collectionType } = formData

    const modelType = collectionType && "collections/"+collectionType 
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
            "title": "formContext",
            "value": "formContext",
            "template": () => <PreviewJSON>{formContext}</PreviewJSON> 
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
            <PreviewTemplate formData={formData} formContext={formContext} />
            <PreviewOptions options={previewOptions} value={value} onChange={_onChange} />
        </PreviewBase>

    )

}

CollectionPreview.defaultProps = {
}

export default CollectionPreview
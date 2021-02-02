import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getModel } from '../redux/modelsById';
import { 
    PreviewBase, 
    PreviewOptions, 
    PreviewJSON
} from "@kit-ui/admin"

import schemasByName from "../schemas/schemasByName"

const DocumentPreview = (props) => {
    const dispatch = useDispatch()

    const editor = useSelector(state => state.editor)
    const modelsById = useSelector(state => state.modelsById)

    const { formData } = editor
    const { documentType, content } = formData

    const links = content && content.links

    useEffect(() => {

        links && links.map(link => {
            const referenceId = link && link.referenceId;
            const referenceModel = referenceId && modelsById[referenceId]

            if (referenceId && !referenceModel) {
                dispatch(getModel({modelName: "documents", uniqueId: referenceId}))
            }
        })

    }, [links])


    const newLinks = links && links.map(link => {
        const referenceId = link && link.referenceId;
        const referenceModel = referenceId && modelsById[referenceId]

        const location = referenceModel && referenceModel.content && referenceModel.content.location

        return {
            ...link,
            ...location,
//            reference: referenceModel
        }

    })

    const newFormData = {
        ...formData,
        content: {
            ...formData.content,
            links: newLinks
        }
    }


    const modelType = documentType && "documents/"+documentType 
    const model = schemasByName && schemasByName[modelType]

    const schema = model && model.schema
    const uiSchema = model && model.uiSchema

    let previewOptions = [
        {
            "title": "JSON",
            "value": "formData",
            "template": () => <PreviewJSON>{newFormData}</PreviewJSON> 
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
            <PreviewTemplate formData={newFormData} />
            <PreviewOptions options={previewOptions} value={value} onChange={_onChange} />
        </PreviewBase>

    )

}

DocumentPreview.defaultProps = {
}

export default DocumentPreview
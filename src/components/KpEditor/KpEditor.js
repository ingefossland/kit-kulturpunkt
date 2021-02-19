import React, { useEffect, useState } from "react"
import { SchemaBase } from "@kit-ui/schema"

import registry from "../registry"

import KpEditorDialog from "./KpEditorDialog"

const KpEditor = (props) => {

    const { schema, uiSchema } = props

    const [formData, setFormData] = useState(props.formData || {})

    const _onChange = ({formData}) => {
        setFormData(formData)
    }

    // toggle

    const [currentId, setCurrentId] = useState(undefined)

    const _onCurrentId = (currentId) => {
        setCurrentId(currentId)
    }

    const _onToggle = ({id, ...props}) => {
        console.log('onToggle', props)

        let parentId = id.split('_');
        parentId.pop();
        parentId = parentId.join('_');
        
        let expandId = undefined

        if (id && currentId && currentId.startsWith(id)) {
            expandId = parentId;            
        } else {
            expandId = id;
        }

        _onCurrentId(expandId)

    }
    
    const _onExpand = ({id}) => {
        console.log('onExpand', id)
        _onCurrentId(id)
    }

    const _onCollapse = ({id}) => {
        console.log('onCollapse', id)
        _onToggle({id})
    }    

    // dialog

    const [dialog, setDialog] = useState({})

    const _onDialog = (props) => {
        const {id, formData, schema, uiSchema, onChange} = props
        console.log("Editor:onDialog", props)

        if (dialog && dialog.id) {
            setDialog({})
        } else {
            setDialog({
                id: id,
                formData: formData,
                schema: schema,
                uiSchema: uiSchema,
                onChange: onChange,
                expanded: true
            })
        }

    }
    

    // preview

    const preview = props.preview && {
        ...props.preview,
        formData: formData,
        formContext: {
            onCurrentId: _onCurrentId
        }
    } 

    const formContext = {
        ...props.formContext,
        languages: ["no","en"],
        preview: preview,
        currentId: currentId,
        onToggle: _onToggle,
        onExpand: _onExpand,
        onCollapse: _onCollapse,
        onEdit: _onExpand,
        onSave: _onCollapse,
        onDialog: _onDialog,

        sidebar: {
            ...dialog,
            onClose: () => _onDialog({}),
            template: KpEditorDialog
        },

    }

    return (
        <SchemaBase
            {...registry}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            formContext={formContext}
            onChange={_onChange}
            />
    )

}

export default KpEditor;
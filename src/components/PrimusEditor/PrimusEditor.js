import React, { useEffect, useState } from "react"
import { SchemaBase } from "@kit-ui/schema"

import registry from "./registry"

const PrimusEditor = (props) => {

    const { schema, uiSchema } = props

    const [formData, setFormData] = useState(props.formData || {})

    const _onChange = ({formData}) => {
        setFormData(formData)
    }

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

    const preview = {
        ...props.preview,
        formData: formData,
    }

    const formContext = {
        ...props.formContext,
        preview: preview,
        currentId: currentId,
        onCurrentId: _onCurrentId,
        onToggle: _onToggle,
        onExpand: _onExpand,
        onCollapse: _onCollapse,
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

export default PrimusEditor;
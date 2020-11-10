import React, { useRef, useState, useEffect } from "react"
import { SchemaBase } from "@kit-ui/schema"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { receiveEdit, receiveCurrentId, requestDialog, receiveDialog } from '../redux/editor';

import registry from "../components/registry"

import EditorDialog from "./EditorDialog"
import EditorPreview from "./EditorPreview"

const Editor = ({schema, uiSchema, onSubmit, ...props}) => {

    let history = useHistory();

    const editorRef = useRef(null)

    const dispatch = useDispatch()

    const formData = useSelector(state => state.editor.formData)
    const dialog = useSelector(state => state.editor.dialog)
    const currentId = useSelector(state => state.editor.currentId)

    const onChange = ({formData}) => {
        console.log('onChange', formData)
        dispatch(receiveEdit(formData))

        //        setFormData(formData)
    }

    const [languages, setLanguages] = useState(["en"])
    const [currentLocale, setCurrentLocale] = useState(null)

    const _onLocale = (locale) => {

    }

    // hashId toggling

    const hashId = props.location.hash && props.location.hash.replace('#','') || null

    useEffect(() => {
        dispatch(receiveCurrentId({currentId: hashId}))
    }, [hashId])

    const _onCurrentId = (currentId) => {
        console.log('editor:onCurrentId', currentId);
        dispatch(receiveCurrentId({currentId: currentId}))
        const hashUrl = props.location.pathname + "#" + currentId; 
        history.replace(hashUrl);

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
    
    const _onSelect = (props) => {
        console.log("select", props)
    }

    const _onExpand = ({id}) => {
        console.log('onExpand', props)
        _onCurrentId(id)
    }

    const _onCollapse = ({id}) => {
        console.log('onCollapse', props)
        _onToggle({id})
    }

    const _onDialog = ({id, formData, schema, uiSchema, onChange}) => {

        if (dialog && dialog.id) {
            dispatch(requestDialog())
        } else {
            dispatch(receiveDialog({
                id: id,
                expanded: true,
                formData: formData,
                schema: schema,
                uiSchema: uiSchema,
                onChange: onChange
            }))
        }

    }

    // formContext

    const formContext = {
        languages: languages,
        currentLocale: currentLocale,
        onLocale: _onLocale,

        currentId: currentId,
        onToggle: _onToggle,

        onExpand: _onExpand,
        onCollapse: _onCollapse,

        onEdit: _onExpand,
        onSave: _onCollapse,

        onSubmit: (status) => onSubmit && onSubmit({formData: {...formData, status: status || formData.status}}), // (e) => editorRef && editorRef.current && editorRef.current.onSubmit(e),

        preview: {
            template: props.preview && props.preview.template || EditorPreview,
            formData: formData,
            formContext: {
                currentId,
                onToggle: _onToggle
            }
        },

        ...props.formContext,

        onDialog: _onDialog,

        sidebar: {
            ...dialog,
            onClose: () => _onDialog({}),
            template: EditorDialog
        },

    }    

    return (
        <SchemaBase
            {...registry}
            ref={editorRef}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            formContext={formContext}
            onChange={onChange}
            onSubmit={onSubmit}
            />
    )


}

Editor.defaultProps = {
    schema: {},
    formData: {},
    formContext: {}
}

export default Editor
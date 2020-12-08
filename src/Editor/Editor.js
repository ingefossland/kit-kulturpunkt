import React, { useRef, useState, useEffect } from "react"
import { SchemaBase } from "@kit-ui/schema"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLayout } from '../redux/app';
import { receiveEdit, receiveCurrentId, receiveCurrentLocale, requestDialog, receiveDialog } from '../redux/editor';

import registry from "../components/registry"

import EditorDialog from "./EditorDialog"
import EditorPreview from "./EditorPreview"

const Editor = ({schema, uiSchema, onSubmit, ...props}) => {
    const { t, i18n } = useTranslation('schema');

    let history = useHistory();

    const editorRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLayout("editor"))
    }, [])

    const app = useSelector(state => state.app)

    const editor = useSelector(state => state.editor)
    const formData = editor.formData

    const currentId = editor.formContext.currentId
    const currentLocale = editor.formContext.currentLocale || formData.locale

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
    
    // change

    const _onChange = ({formData}) => {
        dispatch(receiveEdit(formData))
    }

    // submit

    const _onSubmit = ({formData}) => {
        onSubmit && onSubmit({formData})

        if (dialog && dialog.id) {
            _onDialog({})
        }

    }

    // locale

    const _onLocale = (locale) => {
        dispatch(receiveCurrentLocale({currentLocale: locale}))
    }

    // hashId toggling

    const hashId = props.location.hash && props.location.hash.replace('#','') || null

    useEffect(() => {
        dispatch(receiveCurrentId({currentId: hashId}))
    }, [hashId])

    const _onCurrentId = (currentId) => {
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
    
    const _onExpand = ({id}) => {
        console.log('onExpand', props)
        _onCurrentId(id)
    }

    const _onCollapse = ({id}) => {
        console.log('onCollapse', props)
        _onToggle({id})
    }

    // navigation

    const _onBack = () => {
        props.history.goBack()
    }

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }



    // formContext

    const formContext = {
        t: t,

        ...editor.formContext,
        ...props.formContext,

        onLocale: _onLocale,
        onToggle: _onToggle,

        onExpand: _onExpand,
        onCollapse: _onCollapse,

        onEdit: _onExpand,
        onSave: _onCollapse,

        onBack: _onBack,
        onSelect: _onSelect,

        onSubmit: (event) => _onSubmit(event), // (e) => editorRef && editorRef.current && editorRef.current.onSubmit(e),

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
            onChange={_onChange}
            onSubmit={_onSubmit}
            />
    )


}

Editor.defaultProps = {
    schema: {},
    formData: {},
    formContext: {}
}

export default Editor
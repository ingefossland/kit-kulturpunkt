import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";

import { editModel, saveModel, receiveChange } from '../redux/editor';

import EditorLoader from "./EditorLoader"
import EditorDialog from "./EditorDialog"
import EditorSchema from "./EditorSchema"

import { utils } from '@kit-ui/schema';
const { getUiPreview, getDefaultFormState } = utils

const Editor = ({formData, ...props}) => {

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    // onChange

    const _onChange = ({formData}) => {
        dispatch(receiveChange({formData}))
    }

    const _onSubmit = ({schema, uiSchema, formData}) => {

        if (formData.status === "copy") {
            delete formData.id
            delete formData.uniqueId
            formData.status = "new"
        }

        const uiPreview = getUiPreview({schema, uiSchema, formData})

        formData = {
            ...formData,
            ...uiPreview,
        }

        dispatch(saveModel(formData))

    }    

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const editor = useSelector(state => state.editor)

    const { isLoading, isSaving, uniqueId } = editor

    // uniqueId has changed

    const [prevUniqueId, setPrevUniqueId] = useState(undefined)

    useEffect(() => {

        if (isSaving) {
            setPrevUniqueId(uniqueId)
        } else if (!isSaving && prevUniqueId && prevUniqueId !== uniqueId) {

            console.log('isSaving', isSaving)

            if (formData.uniqueId !== editor.uniqueId && location.pathname.includes("/create")) {
                const editUrl = location.pathname.replace("/create", "/:uniqueId/edit")
                const newLocation = editUrl.replace(":uniqueId", editor.uniqueId)
                history.replace(newLocation);
            }
    
        }



    }, [isSaving])


    // currentId, hashId toggling

    const hashId = location.hash && location.hash.replace('#','') || undefined

    const [currentId, setCurrentId] = useState(hashId)

    /*
    useEffect(() => {
        setCurrentId(hashId)
    }, [hashId])
    */

    const _onCurrentId = (currentId) => {
        setCurrentId(currentId)
        const hashUrl = location.pathname + "#" + currentId; 
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
        console.log('onExpand', id)
        _onCurrentId(id)
    }

    const _onCollapse = ({id}) => {
        console.log('onCollapse', id)
        _onToggle({id})
    }

    const _onSelect = ({url}) => {
        url && history.push(url)
    }

    const _onFocus = (props) => {
        console.log('focus', props)
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

    // parents

    let parents = [
        {
            url: app.url,
            title: app.title,
        },
        ...finder.parents
    ]

    const formContext = {
        ...props.formContext,
        isLoading: editor.isLoading,
        isSaving: editor.isSaving,
        id: editor.formData.id,
        collectionId: editor.formData.collectionId,
        parents: parents,
        currentId: currentId,

        sidebar: {
            ...dialog,
            onClose: () => _onDialog({}),
            template: EditorDialog
        },

        onDialog: _onDialog,


        onFocus: _onFocus,
        onCurrentId: _onCurrentId,
        onSelect: _onSelect,
        onToggle: _onToggle,
        onExpand: _onExpand,
        onCollapse: _onCollapse,
        onSubmit: _onSubmit
    }    
    
    return (
        <EditorLoader formData={formData}>
            <EditorSchema 
                formData={editor.formData} 
                formContext={formContext}
//                schema={schema} 
//                uiSchema={uiSchema} 
                onChange={_onChange}
                onSubmit={_onSubmit} />
        </EditorLoader>
    )

}

export default Editor;
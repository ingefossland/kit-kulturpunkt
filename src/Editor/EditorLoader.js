import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout } from '../redux/app';

import { AppLoader } from "@kit-ui/admin"
import { EditorIcon } from "@kit-ui/icons"

const EditorLoader = ({formData = {}, schema, uiSchema, children}) => {
    const app = useSelector(state => state.app)
    const editor = useSelector(state => state.editor)

    const title = formData.title || app && app.title || "Editor"
    const description = app.isLoading && "Loading app" || editor.isLoading && "Loading editor" || !schema && "Loading schema" || !uiSchema && "Loading uiSchema" || "Editor loaded"

    const isLoading = app.isLoading || editor.isLoading || !schema || !uiSchema || false
    const isSaving = editor.isSaving

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppLayout("editor"))
    }, [isLoading, isSaving])

    return (
        <AppLoader
            isLoading={isLoading}
            icon={<EditorIcon />}
            title={title}
            description={description}>
                {children}
        </AppLoader>
)

}

EditorLoader.defaultProps = {
}

export default EditorLoader
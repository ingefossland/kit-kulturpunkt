import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEditor } from '../redux/editor';

import { Loader } from "@kit-ui/admin"
import { EditorIcon } from "@kit-ui/icons"
import icons from "../icons"

const EditorLoader = ({formData = {}, schema, uiSchema, children, ...props}) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const editor = useSelector(state => state.editor)
    const uniqueId = editor.formData && editor.formData.uniqueId

    const appIcon = icons[app.icon]

    const title = formData.title || app && app.title || "Editor"
    const description = app.isLoading && "Loading app ..." || editor.isLoading && "Loading editor ..." || !schema && "Loading schema ..." || !uiSchema && "Loading uiSchema ..." || "Editor loaded"
    const isLoading = app.isLoading || finder.isLoading || !finder.menuById || editor.isLoading || false
    const icon = app.isLoading && appIcon || finder.isLoading && appIcon || <EditorIcon color={app.theme.palette.primary.main} />

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEditor({pathname, uniqueId, schema, uiSchema}))
    }, [pathname, uniqueId, schema, uiSchema])

    return (
        <Loader
            isLoading={isLoading}
            icon={icon}
            title={title}
            description={description}>
                {children}
        </Loader>
    )

}

EditorLoader.defaultProps = {
}

export default EditorLoader
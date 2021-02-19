import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { getEditor } from '../redux/editor';
import { getParents } from '../redux/finder';
import { collapseHeader } from '../redux/app';

import { Loader } from "../components/Loader"
import EditorIcon from "../icons/EditorIcon"

const EditorLoader = ({formData = {}, children}) => {
    const location = useLocation()
    const pathname = location.pathname

    const editor = useSelector(state => state.editor)
    const { isLoading, isSaving } = editor
    
    const title = "Editor"
    const description = isLoading && "Loading editor ..." || "Editor loaded"

    // app

    const app = useSelector(state => state.app)

    const iconColor = app.theme && app.theme.palette && app.theme.palette.primary.main
    const icon = <EditorIcon color={iconColor} />

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(collapseHeader())
        dispatch(getParents({url: pathname}))
        dispatch(getEditor(formData))
    }, [pathname])

    return (
        <Loader
            isLoading={isLoading}
            icon={icon}
            title={title}
            description={description}>
                {!isLoading && children}
        </Loader>
    )

}

EditorLoader.defaultProps = {
}

export default EditorLoader
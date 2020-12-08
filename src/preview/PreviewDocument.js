import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PreviewIframe from "./PreviewIframe"
import PreviewJSON from "./PreviewJSON"
 
import NavPreview from "./NavPreview"

const PreviewPhone = ({children}) => {
    return (
        <PreviewIframe>
            {children}
        </PreviewIframe>
    )
}

const PreviewSchema = ({schema}) => {
    return (
        <PreviewJSON data={schema} theme="dark" />
    )
}

const PreviewUiSchema = ({uiSchema}) => {
    return (
        <PreviewJSON data={uiSchema} theme="dark" />
    )
}

const PreviewFormData = ({formData}) => {
    return (
        <PreviewJSON data={formData} />
    )
}

const templates = {
    "phone": PreviewPhone,
    "schema": PreviewSchema,
    "uiSchema": PreviewUiSchema,
    "formData": PreviewFormData
}

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    menu: {
        position: "absolute",
        top: "auto",
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(1),

        "& *": {
            margin: theme.spacing(.5),
        }

    }
}));

const Preview = (props) => {
    const classes = useStyles()

    const defaultMenu = [
        { value: 'document', label: 'Preview', selected: true },
        { value: 'schema', label: 'schema' },
        { value: 'uiSchema', label: 'uiSchema' },
        { value: 'formData', label: 'formData' }
    ]

    const [preview, setPreview] = React.useState(defaultMenu[0])
    const [menu, setMenu] = React.useState(defaultMenu)

    const handleSelect = (item) => {
        const { value } = item;

        setPreview(item)
 
        const newMenu = menu.map(item => {
            return {
                ...item,
                selected: item.value === value || false
            }
        })

        setMenu(newMenu);

    }

    const PreviewTemplate = templates[preview.value]
    
    return (
        <div className={classes.root}>
            <PreviewTemplate {...props} />
            <NavPreview className={classes.menu} menu={menu} onSelect={handleSelect} />
        </div>
    )

}

export default Preview
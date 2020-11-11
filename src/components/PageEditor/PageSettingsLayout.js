import React from 'react';

import { EditorSection, EditorContent, EditorOverlay } from "@kit-ui/admin"

import PageMenu from "./PageMenu"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    settings: {
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        "&[aria-expanded=true]": {
            top: 0
        }

    },
}));

const PageSettings = ({id, expanded = true, menuWidth, menu = undefined, children}) => {
    const classes = useStyles();

    /*

    const renderDialog = () => {
        const DialogTemplate = dialog && dialog.template;

        return (
            <EditorOverlay position="fixed" expanded={dialog && dialog.expanded}>
                { DialogTemplate && <DialogTemplate {...dialog} /> }
            </EditorOverlay>
        )
    }

    */

    return (
        <EditorSection id={id} elevation={0} className={classes.settings} aria-expanded={expanded}>
            {menu && <PageMenu menuWidth={menuWidth} menu={menu} /> }
            <EditorContent expanded={true}>
                {children}
            </EditorContent>
        </EditorSection>
    )

}

export default PageSettings;
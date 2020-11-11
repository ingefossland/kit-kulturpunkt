import React from 'react';
import { EditorSection, EditorContent, EditorPreview, EditorSidebar } from "@kit-ui/admin"

import PageMenu from "./PageMenu"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        backgroundColor: theme.palette.background.default,
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",

        transition: ".125s ease-out",
        transform: "translateY(100%)",

        "&[aria-expanded=true]": {
            transform: "translateY(0)",
        }
    },
    wrapper: {
        backgroundColor: "inherit", 
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
}));

const PageContent = ({id, selected = true, sidebar, preview, menuWidth, menu = undefined, children}) => {
    const classes = useStyles();

    const renderSidebar = () => {
        const SidebarTemplate = sidebar && sidebar.template;

        return (
            <EditorSidebar expanded={sidebar && sidebar.expanded}>
                { SidebarTemplate && <SidebarTemplate {...sidebar} /> }
            </EditorSidebar>
        )
    }

    const renderPreview = () => {
        const PreviewTemplate = preview && preview.template;
        return (
            <EditorPreview expanded={true}>
                { PreviewTemplate && <PreviewTemplate {...preview} /> }
            </EditorPreview>
        )
    }  

    return (
        <EditorSection id={id} expanded={selected} className={classes.content}>
            { sidebar && renderSidebar() }
            <EditorSection elevation={0} className={classes.wrapper}>
                { preview && renderPreview() }
                <EditorContent elevation={0}>
                    { menu && <PageMenu menuWidth={menuWidth} menu={menu} /> }
                    {children}
                </EditorContent>
            </EditorSection>
        </EditorSection>
    )

}

export default PageContent;
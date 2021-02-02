import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import EditorBase from "./EditorBase"
import EditorHeader from "./EditorHeader"
import EditorBody from "./EditorBody"
import EditorContent from "./EditorContent"
import EditorSidebar from "./EditorSidebar"
import EditorPreview from "./EditorPreview"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    app: {
        position: "absolute",
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        position: "relative",
        height: theme.spacing(8),
        overflow: "hidden",
        marginTop: theme.spacing(-8),
        transition: ".125s ease-out",
        "&[aria-expanded=true]":  {
            marginTop: 0            
        },
    }
}));

/** AppLayout is a wrapper for all apps using AppHeader */

const EditorLayout = ({app = {}, theme = {}, header = {}, sidebar = {}, search = undefined, subview = undefined, menu, menuByUrl = {}, preview, children}) => {

    if (!theme && app.theme) {
        theme = app.theme
    }

    header = {
        title: app && app.title,
        subtitle: app && app.subtitle,
        ...header,
        subview: subview,
        menu: menu,
        search: search
    }

    sidebar = {
        ...sidebar,
        primaryAction: app.primaryAction,
        menu: app.menu,
        menuByUrl: menuByUrl
    }

    const classes = useStyles({header})

    return (
        <EditorBase>
            <EditorHeader />
            <EditorBody>
                <EditorSidebar {...sidebar}>
                </EditorSidebar>
                <EditorContent>
                    {children}
                </EditorContent>
                { preview && <EditorPreview>
                    { preview && preview.children }
                </EditorPreview> }
            </EditorBody>
        </EditorBase>
    )

}

EditorLayout.defaultProps = {
    app: {

    },
    header: {
        expanded: true
    },
}

EditorLayout.propTypes = {
    /** App properties */
    app: PropTypes.shape({
        uniqueId: PropTypes.string,
        title: PropTypes.string
    }),
    /** Header properties */
    header: PropTypes.shape({
        expanded: PropTypes.bool
    }),
    /** Search properties */
    search: PropTypes.shape({
        expanded: PropTypes.bool
    }),
    /** Subview properties */
    subview: PropTypes.shape({
        expanded: PropTypes.bool
    }),
}

export default EditorLayout;
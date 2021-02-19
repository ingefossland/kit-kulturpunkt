import React from 'react';
import { NavMenu } from "../NavMenu"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    view: {
        backgroundColor: theme.palette.background.default,
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
        boxShadow: theme.shadows[2],

        /*

        transition: ".125s ease-out",
        transform: "translateY(100%)",

        "&[aria-expanded=true]": {
            transform: "translateY(0)",
        }

        */
    },
    split: {
        width: "100%",
        height: "100%",
        display: "flex",
    },
    menu: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 224,
        paddingTop: 24,
        paddingRight: 24,

        "&[aria-hidden=true]": {
            display: "none",
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: 0,
        }
        
    },
    body: {
        flexGrow: 1,
        flexBasis: "100%",
        height: "100%",
        position: "relative",
        overflowY: "scroll",

        "&[aria-hidden=true]": {
            display: "none",
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: 0,
        }
        
    },
    preview: {
        flexGrow: 1,
        flexBasis: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transition: ".25s ease-in-out",

        "&[aria-hidden=true]": {
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: 0,
        }

    }
}));

const EditorSidebar = ({template, expanded, ...props}) => {
    const classes = useStyles();

    if (!template) {
        return false
    }

    const Template = template

    return (
        <div className={classes.sidebar} aria-expanded={expanded}>
            <Template {...props} />
        </div>
    )

}

const EditorSplitView = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.split}>
            {children}
        </div>
    )

}

const EditorBody = ({expanded = true, hidden = false, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.body} aria-expanded={expanded} aria-hidden={hidden}>
            {children}
        </div>
    )

}

const EditorPreview = ({template, hidden, expanded, ...props}) => {
    const classes = useStyles();

    if (!template) {
        return false
    }

    const Template = template

    return (
        <div className={classes.preview} aria-hidden={hidden} aria-expanded={expanded}>
            <Template {...props} />
        </div>
    )

}

const EditorMenu = ({expanded = true, hidden = false, currentUrl, onSelect, menu}) => {
    const classes = useStyles();

    if (!menu) {
        hidden = true
    }

    return (
        <div className={classes.menu} aria-expanded={expanded} aria-hidden={hidden}>
            <NavMenu currentUrl={currentUrl} menu={menu} onSelect={onSelect} />
        </div>
    )
}


const PrimusEditorContentLayout = ({id, selected = true, sidebar = {}, preview = {}, menu = undefined, currentUrl, onSelect, children}) => {
    const classes = useStyles();

    const content = {
        hidden: preview.expanded && true || false
    }

    return (
        <div className={classes.view}>
            { sidebar && <EditorSidebar {...sidebar} /> }
            <EditorSplitView>
                <EditorMenu {...content} currentUrl={currentUrl} menu={menu} onSelect={onSelect} />
                <EditorBody {...content} >
                    {children}
                </EditorBody>
                { preview && <EditorPreview {...preview} /> }
            </EditorSplitView>
        </div>
    )


}

export default PrimusEditorContentLayout;
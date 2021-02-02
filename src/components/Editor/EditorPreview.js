import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        backgroundColor: "#333",
        top: 0,
        right: 0,
        bottom: 0,
        left: "50%",
        overflow: "hidden",

        "& + *": {
            marginRight: "50%"
        }

    }
}));

const EditorPreview = ({className, expanded, children}) => {
    const classes = useStyles()

    return (
        <aside className={className || classes.root} aria-expanded={expanded}>
            {children}
        </aside>
    )
    
}


export default EditorPreview;
import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sidebar: {
        position: "absolute",
        backgroundColor: "#eee",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "50%",
        marginLeft: "-50%",
        overflow: "hidden",
        transition: ".25s ease-out",
        "& + *": {
            transition: ".25s ease-out",
        },
        "&[aria-expanded=true]": {
            marginLeft: 0,
            "& + *": {
                marginLeft: "50%",
                marginRight: "-50%",
            }
        }
    }
}));

const EditorSidebar = ({className, expanded, children}) => {
    const classes = useStyles()

    return (
        <aside className={className || classes.sidebar} aria-expanded={expanded}>
            {children}
        </aside>
    )
    
}


export default EditorSidebar;
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    section: {
        position: props => { return props.position },
        zIndex: props => { return props.zIndex },
        top: props => { return props.top },
        right: props => { return props.right },
        bottom: props => { return props.bottom },
        left: props => { return props.left },
        width: "100%",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        "& + $section": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },
    }
}));

const SectionBase = ({className, position = "relative", collapsible = false, editable = false, expanded, children, ...props}) => {
    const elevation = collapsible && expanded && 4 || editable && expanded && 4 || 1

    if (position === "absolute") {
        props.top = 0
        props.right = 0
        props.bottom = 0
        props.left = 0
    }

    const zIndex = elevation || 1
    const classes = useStyles({position, zIndex, ...props})

    if (!elevation) {
        return (
            <section className={className || classes.section} aria-expanded={expanded}>
                { children }
            </section>
        )
    }

    return (
        <Paper component="section" className={className || classes.section} elevation={elevation} square={true}
            data-elevation={elevation}
            aria-expanded={expanded}>
            { children }
        </Paper>
    )   

}

SectionBase.defaultProps = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
}

export default SectionBase;
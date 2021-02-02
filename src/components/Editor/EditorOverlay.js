import React from 'react'
import Paper from "@material-ui/core/Paper"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    overlay: {
        position: props => { return props.position },
        zIndex: 2000,
        backgroundColor: "rgba(0,0,0,.25)",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transition: ".25s ease-out",

        opacity: 0,
        pointerEvents: "none",

        "&[aria-expanded=true]": {
            pointerEvents: "all",
            opacity: 1            
        }

    },
    content: {
        position: props => { return props.position },
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(2)
    }
}));

const EditorOverlay = ({className, position = "absolute", elevation = 12, expanded, children}) => {
    const classes = useStyles({position})

    return (
        <aside className={classes.overlay} aria-expanded={expanded}>
            <Paper className={className || classes.content} elevation={elevation} square={true}>
                { children }
            </Paper>
        </aside>
    )
}

EditorOverlay.defaultProps = {
    position: "absolute",
    expanded: false
}

export default EditorOverlay;
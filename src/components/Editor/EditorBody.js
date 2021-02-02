import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        backgroundColor: theme.palette.background.default,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}));

const EditorBody = ({className, elevation = 1, expanded = true, children}) => {

    const classes = useStyles()

    if (!elevation) {
        return (
            <section className={className || classes.root} aria-expanded={expanded}>
                {children}
            </section>
        )
    }

    return (
        <Paper elevation={elevation} square={true} className={className || classes.root} aria-expanded={expanded}>
            {children}
        </Paper>
    )

}

export default EditorBody;
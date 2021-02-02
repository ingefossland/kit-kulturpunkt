import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}));

const EditorSection = ({className, elevation = 1, expanded = false, children}) => {

    const classes = useStyles()

    if (!elevation) {
        return (
            <div className={className || classes.root} aria-expanded={expanded}>
                {children}
            </div>
        )
    }

    return (
        <Paper elevation={elevation} square={true} className={className || classes.root} aria-expanded={expanded}>
            {children}
        </Paper>
    )

}

export default EditorSection;
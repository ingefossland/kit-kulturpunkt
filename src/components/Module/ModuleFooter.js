import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    footer: {
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
        padding: props => { return theme.spacing(props.padding) }
    }
}));

/** ModuleFooter */

const ModuleFooter = ({className, padding = 2, children}) => {
    const classes = useStyles({padding});

    if (!children) {
        return false
    }

    return (
        <footer className={className || classes.footer}>
            { children }
        </footer>
    )

}

export default ModuleFooter;
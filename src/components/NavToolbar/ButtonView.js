import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    },

}));

const ButtonView = ({className, onClick}) => {
    const classes = useStyles()

    return (
        <IconButton className={className || classes.button} color="inherit" value="view" aria-label="view" onClick={onClick}>
            <ViewIcon />
        </IconButton>
    )

}

export default ButtonView;
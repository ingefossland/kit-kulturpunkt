import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EraseIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    },

}));

const ButtonErase = ({className, onClick}) => {
    const classes = useStyles()

    return (
        <IconButton className={className || classes.button} color="inherit" value="erase" aria-label="erase" onClick={onClick}>
            <EraseIcon />
        </IconButton>
    )

}

export default ButtonErase;
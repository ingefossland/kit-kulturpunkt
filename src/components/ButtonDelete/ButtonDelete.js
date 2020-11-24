import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    },

}));

const ButtonDelete = ({className, onClick}) => {
    const classes = useStyles()

    return (
        <IconButton className={className || classes.button} color="inherit" value="delete" aria-label="delete" onClick={onClick}>
            <DeleteIcon />
        </IconButton>
    )

}

export default ButtonDelete;
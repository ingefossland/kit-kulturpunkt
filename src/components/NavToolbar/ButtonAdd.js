import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    },

}));

const ButtonAdd = ({className, onClick}) => {
    const classes = useStyles()

    return (
        <IconButton className={className || classes.button} color="inherit" value="add" aria-label="add" onClick={onClick}>
            <AddIcon />
        </IconButton>
    )

}

export default ButtonAdd;
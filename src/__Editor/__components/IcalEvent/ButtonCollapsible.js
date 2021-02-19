import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ToggleIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    },
    icon: {
        transition: ".125s ease-in-out",
        transform: "rotate(0deg)",

        "&[aria-expanded=true]": {
            transition: ".125s ease-in-out",
            transform: "rotate(90deg)"
        }
    }
}));

const ButtonCollapsible = ({className, expanded, onClick}) => {
    const classes = useStyles();
  
    return (
        <IconButton className={className || classes.button} color="inherit" aria-label="toggle" aria-expanded={expanded} onClick={onClick}>
            <ToggleIcon className={classes.icon} aria-expanded={expanded} />
        </IconButton>
    );

}

export default ButtonCollapsible;
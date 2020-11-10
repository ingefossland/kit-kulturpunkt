import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    },
    icon: {
    }
}));

const ButtonLink = ({className, expanded, onClick}) => {
    const classes = useStyles();
  
    return (
        <IconButton className={className || classes.button} color="inherit" onClick={onClick}>
            <LinkIcon className={classes.icon} aria-expanded={expanded} />
        </IconButton>
    );

}

export default ButtonLink;
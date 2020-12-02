import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    },

}));

const ButtonLink = ({className, onClick}) => {
    const classes = useStyles()

    return (
        <IconButton className={className || classes.button} color="inherit" value="link" aria-label="link" onClick={onClick}>
            <LinkIcon />
        </IconButton>
    )

}

export default ButtonLink;
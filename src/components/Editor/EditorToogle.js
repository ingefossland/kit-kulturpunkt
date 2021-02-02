import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ToggleIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        transition: ".125s ease-in-out",
        transform: "rotate(0deg)",

        "&[aria-expanded=true]": {
            transition: ".125s ease-in-out",
            transform: "rotate(90deg)"
        }

    }
}));

const EditorToggle = ({expanded, onClick}) => {
    const classes = useStyles();
  
    return (
        <IconButton className={classes.root} color="inherit" aria-label="toggle" aria-expanded={expanded} onClick={onClick}>
            <ToggleIcon />
        </IconButton>
    );

}

export default EditorToggle;
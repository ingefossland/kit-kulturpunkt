import React from 'react';
import ListSubheader from "@material-ui/core/ListSubheader"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    subheader: {
        width: "100%",
    }
}));

const NavSuggestSubheader = ({children}) => {
    const classes = useStyles()

    return (
        <ListSubheader className={classes.subheader} component="div">
            {children}
        </ListSubheader>
    )
}

export default NavSuggestSubheader
import React from 'react';
import MenuList from "@material-ui/core/MenuList"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        width: "100%",

        listStyle: "none",
        padding: 0,
        margin: 0,

        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",

        "& > li": {
            padding: 0
        },

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
        }
        
    }
}));

const NavSuggestList = ({id, className, role = "listbox", children}) => {
    const classes = useStyles()

    return (
        <MenuList id={id} className={className || classes.list} role={role}>
            { children }
        </MenuList>
    )
}

export default NavSuggestList
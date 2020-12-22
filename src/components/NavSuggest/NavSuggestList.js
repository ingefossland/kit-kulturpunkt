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

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        }
        
    }
}));

const NavSuggestList = ({className, role = "tree", children}) => {
    const classes = useStyles()

    return (
        <MenuList className={className || classes.list}>
            { children }
        </MenuList>
    )
}

export default NavSuggestList
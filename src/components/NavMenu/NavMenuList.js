import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: "border-box",
        listStyle: "none",
        padding: 0,
        margin: 0,
        "&[role=tree]": {
            marginLeft: theme.spacing(3)
        },
        "& > li + li": {
            marginTop: theme.spacing(.5)
        },
        "& > li > ul > li + li": {
            marginTop: 0
        },
        "&[role=group] > li + li": {
            marginTop: theme.spacing(.5)
        }
    }
}));

const MenuList = ({className, role = "tree", children}) => {
    const classes = useStyles()

    return (
        <ul className={className || classes.root} role={role}>
            { children }
        </ul>
    )
}

export default MenuList
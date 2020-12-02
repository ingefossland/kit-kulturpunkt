import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        top: 0,
        right: "auto",
        left: 0,
        bottom: 0,
        width: props => { return props.width },
        marginLeft: props => { return "-" + props.width + "px" },
        transition: ".125s ease-out",
        "&[aria-expanded=true]":  {
            [theme.breakpoints.up('sm')]: {
                marginLeft: 0,
            }
        },
        "&[aria-expanded=true] + *":  {
            [theme.breakpoints.up('sm')]: {
                marginLeft: props => { return props.width },
            }
        },
    }
}));

const AppDrawer = ({expanded = true, width = 224, children}) => {

    const classes = useStyles({width})

    return (
        <aside className={classes.root} aria-expanded={expanded}>
            {children}
        </aside>
    )

}

export default AppDrawer;
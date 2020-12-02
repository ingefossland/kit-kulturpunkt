import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sidebar: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: "auto",
        left: 0,
        bottom: 0,
        width: props => { return props.width },
        marginLeft: props => { return "-" + props.width + "px" },
        transition: ".125s ease-out",

        "& + *": {
            transition: ".125s ease-out",
        },

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

const FinderSidebar = ({className, children, expanded = false, width = 240}) => {
    const classes = useStyles({width})

    return (
        <aside className={className || classes.sidebar} aria-expanded={expanded}>
            {children}
        </aside>
    )

}

export default FinderSidebar;
import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    link: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        color: theme.palette.text.secondary,

        padding: theme.spacing(1, 0),

        "&[aria-selected=true]": {

            "& $label": {
                color: theme.palette.text.primary,
                color: theme.palette.type === "dark" && theme.palette.primary.light || theme.palette.primary.dark,
            }

        }
    },
    icon: {
        margin: theme.spacing(0, 2.5),
        "&[aria-selected=true]": {
            color: theme.palette.text.primary,
        }
    },
    label: {
        flexGrow: 1,
        display: "block",
        width: "100%",
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        lineHeight: 1,

    },
    count: {
        position: "absolute",
        right: 0,
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px",
        fontStyle: "normal",
        lineHeight: "24px",
        textAlign: "right",
        color: theme.palette.text.secondary,
        margin: theme.spacing(2)
    }
}));

const NavSuggestLink = ({className, selected, icon = "search", label, title, description, count, onClick, children }) => {
    const classes = useStyles()

    if (!label && title) {
        label = title
    }

    let color

    if (selected) {
        color = "primary"
    }

    return (
        <MenuItem className={className || classes.link} aria-selected={selected} onClick={onClick}>
            { icon && <ListItemIcon><Icon className={classes.icon}>{icon}</Icon></ListItemIcon> }
            <ListItemText className={classes.label} primary={label} secondary={description}></ListItemText>
            { count && <Typography component="i" align="right" nowrap="true" className={classes.count}>{count}</Typography> }
        </MenuItem>
    )
}

export default NavSuggestLink
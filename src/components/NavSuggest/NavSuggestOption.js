import React from 'react';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const useStyles = makeStyles(theme => ({
    option: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        color: theme.palette.text.secondary,
        padding: theme.spacing(1, 0),
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
    highlight: {
        fontWeight: 'bold'
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

const NavSuggestLink = ({className, selected, icon = "search", highlight, label, title, description, count }) => {
    const classes = useStyles()

    if (!label && title) {
        label = title
    }

    let color

    if (selected) {
        color = "primary"
    }

    const matches = match(label, highlight);
    const parts = parse(label, matches);

    const primary = parts.map((part, index) => {
        if (part.highlight) {
            return <b className={classes.highlight}>{part.text}</b>
        }
        return part.text
    })

    return (
        <div className={className || classes.option}>
            { icon && <ListItemIcon><Icon className={classes.icon}>{icon}</Icon></ListItemIcon> }
            <ListItemText className={classes.label} primary={primary} secondary={description}></ListItemText>
            { count && <Typography component="i" align="right" nowrap="true" className={classes.count}>{count}</Typography> }
        </div>
    )
}

export default NavSuggestLink
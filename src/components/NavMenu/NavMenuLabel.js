import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        paddingRight: theme.spacing(3),
        alignItems: "center",
        justifyContent: "start",
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "24px",
        color: theme.palette.text.secondary,
        "&[aria-selected=true]": {

            "& $label": {
                color: theme.palette.text.primary,
                color: theme.palette.type === "dark" && theme.palette.primary.light || theme.palette.primary.dark,
            }

        },
        marginBottom: theme.spacing(1.5),
    },
    icon: {
        "&[aria-selected=true]": {
            color: theme.palette.text.primary,
        }
    },
    label: {
        display: "block",
        width: "100%",
        flexBasis: "100%",
        fontFamily: "inherit",
        fontSize: "inherit",
        lineHeight: "inherit",
//        paddingLeft: "12px",
//        paddingRight: "6px"
    },
    count: {
        position: "absolute",
        right: 0,
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px",
        fontStyle: "normal",
        lineHeight: "24px",
        textAlign: "right",
        color: theme.palette.text.secondary
    }
}));

const MenuLink = ({className, url, selected, icon, label, title, count, onClick, children }) => {
    const classes = useStyles()

    if (!label && title) {
        label = title
    }

    let color

    if (selected) {
        color = "primary"
    }

    if (!url) {
        return (
            <div color={color} className={className || classes.root} aria-selected={selected}>
            { label && <Typography component="b" align="left" noWrap className={classes.label}>{label}</Typography> }
            </div>
        )
    }

    return (
        <ButtonBase color={color} className={className || classes.root} aria-selected={selected} onClick={onClick}>
            { label && <Typography component="b" align="left" noWrap className={classes.label}>{label}</Typography> }
        </ButtonBase>
    )

    return (
        <ButtonBase color={color} className={className || classes.root} aria-selected={selected} onClick={onClick}>
            { icon && <Icon className={classes.icon} aria-selected={selected}>{icon}</Icon> }
            { label && <Typography component="b" align="left" noWrap className={classes.label}>{label}</Typography> }
            { count && <Typography component="i" align="right" nowrap="true" className={classes.count}>{count}</Typography> }
            { children }
        </ButtonBase>
    )
}

export default MenuLink
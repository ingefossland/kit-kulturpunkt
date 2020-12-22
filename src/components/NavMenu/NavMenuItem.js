import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ToggleIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: "border-box",
        position: "relative",
        display: "block",
        width: "100%",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        lineHeight: "24px",

        "&[role=group] + *": {
            borderTop: "1px solid",
            borderTopColor: theme.palette.divider,
            marginTop: theme.spacing(1.5),
            paddingTop: theme.spacing(1.5),
        },
        "& + &[role=group]": {
            borderTop: "1px solid",
            borderTopColor: theme.palette.divider,
            marginTop: theme.spacing(1.5),
            paddingTop: theme.spacing(1.5),

            "& + *": {
                borderTop: "1px solid",
                borderTopColor: theme.palette.divider,
                marginTop: theme.spacing(1.5),
                paddingTop: theme.spacing(1.5),
            }

        }
    },
    toggle: {
        position: "absolute",
        left: "-24px",
        padding: 0,
        margin: 0,
        opacity: 0.5
    },
    toggleCollapsed: {
        transition: ".125s ease-in-out",
        transform: "rotate(-90deg)"
    },
    toggleExpanded: {
        transition: ".125s ease-in-out",
        transform: "rotate(0deg)"
    },
    count: {
        position: "absolute",
        right: 0,
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px",
        fontStyle: "normal",
        lineHeight: "24px",
        opacity: 0.5
    }
}));

const MenuToggle = ({expanded = false, onClick}) => {
    const classes = useStyles();
    const toggleIcon = expanded && classes.toggleExpanded || classes.toggleCollapsed

    return (
        <IconButton className={classes.toggle} onClick={onClick} aria-expanded={expanded} size="small">
            <ToggleIcon className={toggleIcon} />
        </IconButton>
    )
}

const MenuItem = ({className, role = "treeitem", count, expanded = false, onToggle, children}) => {
    const classes = useStyles();

    return (
        <li className={className || classes.root} role={role} aria-expanded={expanded}>
            { onToggle && <MenuToggle expanded={expanded} onClick={onToggle} /> }
            { children }
        </li>
    )
}

export default MenuItem
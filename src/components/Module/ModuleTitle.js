import React from 'react';
import PropTypes from "prop-types"

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: "bold",
        maxWidth: "100%",
        color: theme.palette.text.primary,
        "&[data-status=trash]": {
            color: theme.palette.text.disabled,
            textDecoration: "line-through"
        },
        "&[data-status=erased]": {
            color: theme.palette.text.disabled,
            textDecoration: "line-through"
        },
    },
    link: {
        color: "inherit",
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

const ModuleTitle = ({className, title, untitled = "Untitled", status, onClick, children}) => {
    const classes = useStyles()

    if (!title && children) {
        title = children
    }

    if (!title && untitled) {
        title = untitled
    }

    if (onClick) {
        return (
            <Typography data-status={status} className={className || classes.root} component="h2" noWrap={true}>
                <Link className={classes.link} onClick={onClick}>{title}</Link>
            </Typography>
        )
    }

    return (
        <Typography data-status={status} className={className || classes.root} component="h2" noWrap={true}>{title}</Typography>
    )
}

ModuleTitle.propTypes = {
    untitled: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
};

ModuleTitle.defaultProps = {
    onClick: undefined,
};


export default ModuleTitle;
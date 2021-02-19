import React from 'react';
import PropTypes from "prop-types"

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: "bold",
        maxWidth: props => { return props.maxWidth },
        color: theme.palette.text.primary,
    },
    link: {
        color: "inherit",
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

const ModuleTitle = ({className, maxWidth = "100%", title, untitled = "Untitled", onClick, children}) => {

    const classes = useStyles({maxWidth})

    if (!title && children) {
        title = children
    }

    if (onClick) {
        return (
            <Typography data-name="title" data-untitled={!title} className={className || classes.title} component="h2" noWrap={true}>
                <Link className={classes.link} onClick={onClick}>{title || untitled}</Link>
            </Typography>
        )
    }

    return (
        <Typography data-name="title" data-untitled={!title} className={className || classes.title} component="h2" noWrap={true}>{title || untitled}</Typography>
    )
}

ModuleTitle.propTypes = {
    maxWidth: PropTypes.string,
    untitled: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
};

ModuleTitle.defaultProps = {
    onClick: undefined,
};


export default ModuleTitle;
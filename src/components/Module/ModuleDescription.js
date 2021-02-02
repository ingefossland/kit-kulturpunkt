import React from 'react';
import PropTypes from "prop-types"

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: "100%",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: "normal",
        color: props => { return props.color || theme.palette.text.secondary }
    }
}));

const ModuleDescription = ({className, color, description, children}) => {
    const classes = useStyles({color})

    if (!description && children) {
        description = children
    }

    if (!description || typeof(description) === "undefined") {
        return false
    }

    return (
        <Typography className={className || classes.root} noWrap={true} component="h3">{description}</Typography>
    )
}

ModuleDescription.propTypes = {
    description: PropTypes.string,
}

export default ModuleDescription;
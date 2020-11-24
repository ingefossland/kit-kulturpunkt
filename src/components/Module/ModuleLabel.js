import React from 'react';
import Color from 'color';
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { getContrastColor } from "../utils"

const useStyles = makeStyles(theme => ({
    root: {
        display: "inline-block",
        fontSize: "12px",
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "inherit",
        fontWeight: "bold",
        padding: ".125em .75em",
        border: "1px solid",
        backgroundColor: props => { return props.color || "transparent" },
        borderColor: props => { return props.color || theme.palette.divider },
        color: props => { return props.color && getContrastColor(props.color) || theme.palette.text.secondary },
        borderRadius: "1.25em",
    }
}));

const ModuleLabel = ({className, component = "h4", label, color, children}) => {
    const classes = useStyles({color})

    if (!label && children) {
        label = children
    }

    if (!label) {
        return false
    }

    return (
        <span className={className || classes.root}>
           <Typography className={classes.label} noWrap={true} component={component}>{label}</Typography>
        </span>
    )
}

ModuleLabel.propTypes = {
    component: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string
};

ModuleLabel.defaultProps = {
    label: undefined,
    color: undefined
};

export default ModuleLabel;
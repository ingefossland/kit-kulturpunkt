import React from 'react';
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { getContrastColor } from "./utils"
import theme from '../../app/settings/kiosk/theme';

const useStyles = makeStyles(theme => ({
    status: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: props => { return props.fontSize },
        textTransform: "capitalize",
        fontWeight: "bold",
        padding: ".125em .75em",
        border: "1px solid",

        backgroundColor: theme.palette.divider,
        color: theme.palette.text.secondary,
        borderColor: "transparent",

        backgroundColor: "transparent",
        color: theme.palette.text.secondary,
        borderColor: theme.palette.divider,

        borderRadius: "1.25em",

        "&[data-status=trash]": {
            backgroundColor: "transparent",
            color: theme.palette.action.divider,
            border: "1px dotted",
            borderColor: theme.palette.action.divider || theme.palette.action.disabled,
        },

        "&[data-status=erased]": {
            backgroundColor: "transparent",
            color: theme.palette.action.divider,
            border: "1px dotted",
            borderColor: theme.palette.action.disabled,
        },

        "&[data-status=draft]": {
            backgroundColor: props => { return props.variant === "outlined" && "transparent" || theme.palette.divider },
            borderColor: props => { return props.variant === "outlined" && theme.palette.divider || "transparent" }
        },

        "&[data-status=publish]": {
            backgroundColor: props => { return props.variant === "outlined" && "transparent" || theme.palette.primary.main },
            color: props => { return props.variant === "outlined" && theme.palette.text.primary || getContrastColor(theme.palette.primary.main) },
            borderColor: props => { return props.variant === "outlined" && theme.palette.primary.main || "transparent" }
        }

    }    
}));

/** ModuleStatus, draft, publish, trash, erased */

const ModuleStatus = ({component = "span", variant = "filled", fontSize = 12, status, colors = {}, children}) => {

    const classes = useStyles({fontSize, colors, variant})

    if (!status) {
        return false
    }

    if (!children && status) {
        children = status
    }

    return (
        <Typography data-status={status} className={classes.status} noWrap={true} component={component}>{children}</Typography>
    )
}

ModuleStatus.defaultProps = {
    color: undefined,
    colors: {
    }
}

ModuleStatus.propTypes = {
    variant: PropTypes.oneOf(["filled","outlined"]),
    status: PropTypes.string,
    colors: PropTypes.object,
    color: PropTypes.string,
};

export default ModuleStatus;
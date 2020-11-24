import React from 'react';
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: "bold",
        color: theme.palette.text.secondary
    }
}));

/** ModuleStatus, draft, publish, trash, erased */

const ModuleStatus = ({component = "h3", status, children}) => {

    const classes = useStyles()

    if (!status && children) {
        status = children
    }

    if (!status) {
        return false
    }

    return (
        <Typography className={classes.label} noWrap={true} component={component}>{status}</Typography>
    )
}

ModuleStatus.propTypes = {
    status: PropTypes.string,
};

export default ModuleStatus;
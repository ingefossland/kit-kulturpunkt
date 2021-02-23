import React from 'react';
import moment from 'moment';
import "moment/locale/nb";
import "moment/locale/nn";
import "moment/locale/sv";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { ModuleStatus, ModuleDate } from "../Module"

const useStyles = makeStyles(theme => ({
    status: {
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px",
        margin: theme.spacing(1)
    },

}));

const statusLabels = {
    "new": "Ny",
    "draft": "Utkast",
    "publish": "Publisert",
    "error": "Feil"
}

const StatusMessage = ({className, status, code, children}) => {
    const classes = useStyles()

    if (!children) {
        return false
    }

    return (
        <span data-status={status} data-code={code} className={className || classes.message}>{children}</span>
    )
}

const EditorStatus = ({className, status, statusLabel, statusDate, statusCode, statusMessage}) => {
    const classes = useStyles()

    if (!statusLabel && statusLabels[status]) {
        statusLabel = statusLabels[status]
    }

    return (
        <Typography className={className || classes.status} noWrap>
            <ModuleStatus variant="outlined" fontSize={14} status={status}>{statusLabel || status}</ModuleStatus>
            <StatusMessage className={classes.message} status={status} code={statusCode}>{statusMessage}</StatusMessage>
            {!statusMessage && <ModuleDate datetime={statusDate} className={classes.datetime}>{statusDate}</ModuleDate> }
        </Typography>
    )

}

export default EditorStatus;
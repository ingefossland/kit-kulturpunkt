import React from 'react';
import moment from 'moment';
import "moment/locale/nb";
import "moment/locale/nn";
import "moment/locale/sv";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px",
        margin: theme.spacing(1)
    },
    status: {
        display: "inline",
        fontWeight: "bold",
        "&[data-status=error]": {
            color: theme.palette.error.main
        }
    },
    message: {
        display: "inline",
        marginLeft: theme.spacing(1),
        "&[data-status=error]": {
            color: theme.palette.error.main
        }
    },
    datetime: {
        display: "inline",
        marginLeft: theme.spacing(1)
    }
}));

const statusLabels = {
    "new": "Ny",
    "draft": "Utkast",
    "publish": "Publisert",
    "error": "Feil"
}

const StatusLabel = ({className, locale = "nb", status, children}) => {
    const classes = useStyles()

    const statusLabel = children || statusLabels[status] || status

    return (
        <span className={className || classes.status} data-status={status}>{statusLabel}</span>
    )

}

const StatusDate = ({className, locale = "nb", format = "relative", datetime, children}) => {
    const classes = useStyles()

    datetime = children || datetime
    
    if (!datetime) {
        return false
    }

    // format value

    moment.locale(locale)

    let date;
    
    if (format === "relative") {
        date = moment.utc(datetime).local().fromNow()
    } else if (format) {
        date = moment.utc(datetime).local().format(format)
    }

    return (
        <time datetime={datetime} className={className || classes.datetime}>{date}</time>
    )
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

    return (
        <Typography className={className || classes.root} noWrap>
            <StatusLabel className={classes.status} status={status}>{statusLabel}</StatusLabel>
            <StatusMessage className={classes.message} status={status} code={statusCode}>{statusMessage}</StatusMessage>
            {!statusMessage && <StatusDate className={classes.datetime}>{statusDate}</StatusDate> }
        </Typography>
    )

}

export default EditorStatus;
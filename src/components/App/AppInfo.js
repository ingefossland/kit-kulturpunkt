import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography"
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        margin: 14,
    },
    info: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 64,
        color: theme.palette.text.primary,
        "& > *": {
            fontSize: "inherit",
            color: "inherit"
        }
    },
    content: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 8
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        color: theme.palette.text.primary
    },
    version: {
        fontFamily: "Akkurat mono, monospace",
        fontSize: 12,
        color: theme.palette.text.secondary
    }

}));


const AppInfo = ({className, icons, icon, title, version, onClick}) => {
    const classes = useStyles()
    const appIcon = icons && icons[icon]

    return (
        <div className={className || classes.wrapper}>
            <div className={classes.info}>
                <Icon className={classes.icon} onClick={onClick}>
                    {appIcon}
                </Icon>
                <div className={classes.content}>
                    <Typography className={classes.title}>{title}</Typography>
                    <Typography className={classes.version}>{version}</Typography>
                </div>
            </div>
        </div>
    )

}

AppInfo.defaultProps = {
}

export default AppInfo
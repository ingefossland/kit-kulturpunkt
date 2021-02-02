import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "inherit",
        display: "flex",
        margin: theme.spacing(-0.5)
    },
    button: {
        padding: theme.spacing(0.5)
    },
    icon: {
        fontSize: "18px",
        marginRight: theme.spacing(1)
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
    }

}));

const ToolbarButton = ({icon, label, title, onClick}) => {
    const classes = useStyles()

    return (
        <ButtonBase className={classes.button} onClick={onClick}>
            { icon && <i className={classes.icon}><Icon>{icon}</Icon></i> }
            <b className={classes.label}>{label || title}</b>
        </ButtonBase>
    )

}

const FinderToolbar = ({buttons = []}) => {
    const classes = useStyles()

    if (!buttons.length) {
        return null
    }

    return (
        <nav className={classes.root}>
            { buttons.map((button, index) => {
                return (
                    <ToolbarButton {...button} key={index} />
                )
            })}
        </nav>
    )
    
} 

export default FinderToolbar;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModuleBase from "./ModuleBase"
import ModuleMedia from './ModuleMedia';
import ModuleTitle from './ModuleTitle';
import ModuleLabel from './ModuleLabel';
import ModuleStatus from './ModuleStatus';
import ModuleByline from './ModuleByline';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: props => { return props.width },
        userSelect: "none",

        "&[data-status=erased]": {

            "& figure": {
                opacity: "0.5"
            },

            "& $content": {
                opacity: "0.5"
            }

        },

        "&[data-status=trash]": {

            "& figure": {
                opacity: "0.5"
            },

            "& $content": {
                opacity: "0.5"
            }

        },        
    },

    leadingIcon: {
        position: "absolute",
        zIndex: 3,
        top: 0,
        right: 'auto',
        bottom: "auto",
        left: 0,
    },
    actionbar: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        width: props => { return props.width },
        height: props => { return props.height },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        opacity: "0",

        "& button[name=select]": {
            position: "absolute",
            top: 0,
            right: 0
        },
        "& button[name=toggle]": {
            position: "absolute",
            top: 0,
            right: 0
        }
    },
    content: {
        flexDirection: "column",
        display: "flex",
        alignItems: "left",
        justifyContent: "flex-start",
        padding: theme.spacing(1)
    },
    header: {
        width: "100%",
        flexBasis: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: theme.spacing(.5)
    },
    body: {
        width: "100%",
        flexBasis: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "& > * + *": {
            marginLeft: theme.spacing(.5)
        }
    },
    footer: {
        display: "flex",
        alignItems: "baseline",
        width: "100%",
        flexBasis: "100%",
        justifyContent: "flex-start",
        "& > * + *": {
            marginLeft: theme.spacing(.5)
        }
    }
}));

const CardModule = ({ 
    width = 180, 
    maxWidth, 
    mediaStyle, 
    mediaHeight = 180, 
    mediaLayout = "contain", 
    selected, 
    imageUrl, 
    title, 
    description, 
    type,
    typeLabel, 
    status,
    statusLabel,
    author, 
    datetime, 
    onClick,
//    onSelect,
    onEdit, 
    ...props
}) => {

    if (maxWidth) {
        width = maxWidth
    }

    const classes = useStyles({
        width: width,
        height: mediaHeight,
    })

    const media = {
        selected: selected,
        layout: mediaLayout,
        imageUrl: imageUrl || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==",
        width: width,
        height: mediaHeight,
    }

    return (
        <ModuleBase {...props} elevation={1} className={classes.root} selected={selected} status={status} onClick={onClick}>
            <ModuleMedia {...media} />
            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle title={title} status={status} onClick={onClick && undefined || onEdit} />
                </header>
                <div className={classes.body}>
                    <ModuleLabel label={typeLabel || type} />
                    <ModuleStatus status={statusLabel || status} />
                </div>
                <footer className={classes.footer}>
                    <ModuleByline author={author} datetime={datetime} />
                </footer>
            </div>
        </ModuleBase>
    )    

}


CardModule.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    typeLabel: PropTypes.string,
    status: PropTypes.string,
    statusLabel: PropTypes.string,
    author: PropTypes.string,
    datetime: PropTypes.string,
    onClick: PropTypes.func,
    onEdit: PropTypes.func
}

export default CardModule;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModuleBase from "./ModuleBase"
import ModulePrefix from "./ModulePrefix"

import ModuleMedia from './ModuleMedia';
import ModuleTitle from './ModuleTitle';
import ModuleLabel from './ModuleLabel';
import ModuleStatus from './ModuleStatus';
import ModuleByline from './ModuleByline';

import NavToolbar from "../NavToolbar/NavToolbar"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "transparent",
        position: "relative",
        width: props => { return props.width },
        userSelect: "none",

        "& $toolbar": {
            opacity: 0
        },

        "&:hover": {
            "& $toolbar": {
                opacity: 1
            }
        }, 
        "&[data-status=trash]": {
            "& $media": {
                opacity: .5 
            },
            "& $toolbar": {
                opacity: 1
            }
        },        
        "&[data-status=erased]": {
            "& $media": {
                opacity: .25 
            }
        },
    
    },
    grid: {
        display: "block",
        backgroundColor: "transparent",
        color: "white",
        position: "relative",
        width: "100%",
        
        "&[role=button]": {
            cursor: "pointer",
        },

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
            color: "currentColor",

            "& $primaryAction": {
                opacity: 1,
            },

            "& $media": {
//                opacity: .75
            }
        }

    },
    media: {
        display: "block",
        position: "relative",
        width: "100%",
        height: props => { return props.mediaHeight},
        margin: "0"
    },
    primaryAction: {
        position: "absolute",
        zIndex: 3,
        top: 0,
        right: 'auto',
        bottom: "auto",
        left: 0,

        "& button": {
            color: "white",
        },

    },
    toolbar: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        width: "100%",
        height: props => { return props.mediaHeight },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "& button": {
            color: "white",
            opacity: .5,

            "&:hover": {
                opacity: 1
            }

        },

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

const GridModule = ({ 
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
        mediaHeight: mediaHeight,
    })

    const media = {
        elevation: 1,
        selected: selected,
        layout: mediaLayout,
        imageUrl: imageUrl || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==",
    }

    return (
        <ModuleBase {...props} className={classes.root} selected={selected} status={status} onClick={undefined}>
            <div className={classes.grid} onClick={onClick} role={onClick && "button"} aria-selected={selected}>
                <ModuleMedia {...media} className={classes.media} />
            </div>
            <NavToolbar {...props} className={classes.toolbar} />
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
            <ModulePrefix className={classes.primaryAction} selected={selected} {...props} />
        </ModuleBase>
    )    

}


GridModule.propTypes = {
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

export default GridModule;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonBase from "@material-ui/core/ButtonBase"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"

import {
    ModuleBase,
    ModulePrefix,
    ModuleMedia,
    ModuleTitle,
    ModuleLabel,
    ModuleStatus,
    ModuleByline,
    NavToolbar
} from "@kit-ui/admin"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    placeholder: {
        width: props => { return props.width },

        "& $media": {
        }

    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
    },
    module: {
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
        margin: "0",



        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        backgroundColor: "grey",

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
    role = "media",
    placeholder,
    width = 180, 
    maxWidth = "100%", 
    mediaStyle, 
    mediaHeight = 180, 
    mediaLayout = "cover", 
    selected, 

    icon,
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

    if (!imageUrl && !icon) {
        imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
    }

    if (role === "button") {
        return (
            <ButtonBase className={classes.placeholder} selected={selected} status={status} onClick={onClick}>
                <Paper className={classes.media} elevation={1} square={true}>
                    { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                    <Typography className={classes.label}>{title}</Typography>
                </Paper>
            </ButtonBase>            
        )        
    }

    return (
        <ModuleBase {...props} className={classes.module} selected={selected} status={status} onClick={onClick}>
            <figure className={classes.media} onClick={onClick} role={onClick && "button"} aria-selected={selected}>
                { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                { imageUrl && <ModuleMedia elevation={1} selected={selected} layout="cover" imageUrl={imageUrl} className={classes.image} /> }
            </figure>
            {!onClick &&  <NavToolbar {...props} className={classes.toolbar} /> }
            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle title={title} status={status} onClick={onClick && undefined || onEdit} />
                </header>
                <div className={classes.body}>
                    <ModuleLabel label={typeLabel || type} />
                    { status &&  <ModuleStatus status={statusLabel || status} /> }
                </div>
                <footer className={classes.footer}>
                    <ModuleByline author={author} datetime={datetime} />
                </footer>
            </div>
            {!onClick && <ModulePrefix className={classes.primaryAction} selected={selected} {...props} /> }
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

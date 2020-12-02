import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonBase from "@material-ui/core/ButtonBase"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"

import {
    ModuleBase,
    ModulePrefix,
    ModuleImage,
    ModuleTitle,
    ModuleLabel,
    ModuleStatus,
    ModuleByline,
    NavToolbar
} from "../"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    placeholder: {
        width: props => { return props.width },

        "& $media": {
            backgroundColor: "white"
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

        "& button": {
            opacity: 0,

            "&:hover": {
                opacity: 1,
            },
    
        },

        "&:hover": {

            "& button": {
                opacity: .5,
            },

            "& $image, & $icon": {
                opacity: .5
            }

        },

        "&[data-deleted=true]": {
            "& $media": {
                opacity: .5 
            },
            "& button": {
                opacity: 1
            }
        },        

        "&[data-erased=true]": {
            "& $media": {
                opacity: .25 
            }
        },

        "&[aria-selected=true]": {

            "& button[name=select]": {
                opacity: 1,
            },

            "& $media": {
//                backgroundColor: theme.palette.action.selected
            }
        }
        

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


    },
    media: {
        display: "block",
        backgroundColor: "grey",
        position: "relative",
        width: "100%",
        height: props => { return props.mediaHeight},
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {

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
        justifyContent: "center",
        alignItems: "center",

        "& button": {
            position: "absolute",
            color: "white",

            "&[name=select]": {
                top: 0,
                left: 0,
            },

            "&[name=delete],&[name=restore]": {
                top: 0,
                right: 0,
            },

            "&[name=view]": {
                bottom: 0,
                left: 0,
            },

            "&[name=link]": {
                bottom: 0,
                right: 0,
            },

            "&[name=edit]": {
//                bottom: 0,
//                margin: theme.spacing(-1),
            },

            "&:hover": {
                opacity: 1
            }

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

const GalleryModule = ({
    role = "media",
    placeholder,
    width = 180, 
    maxWidth = "100%", 
    mediaStyle, 
    mediaHeight = 180, 
    mediaLayout = "cover", 

    ...props
}) => {

    const {
        status,
        statusLabel,
    
        documentType,
        documentLabel,
    
        selectable,
        selected,
        onSelect,
    
        editable,
        onEdit,
    
        viewable,
        onView,
    
        linkable,
        onLink,
    
        deletable,
        deleted,
        onDelete,
    
        restorable,
        onRestore,
    
        erasable,
        erased,
        onErase,
    
        icon,
        imageUrl,
        untitled,
    
        title,
        description,
        metadata,
        author,
        datetime,
    
        onClick,
    } = props

    if (maxWidth) {
        width = maxWidth
    }

    const classes = useStyles({
        width: width,
        mediaHeight: mediaHeight,
    })

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

    const defaultImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="

    return (
        <ModuleBase {...props} className={classes.module} selected={selected} status={status} onClick={onClick}>
            <figure className={classes.media} onClick={onClick} role={onClick && "button"} aria-selected={selected}>
                <ModuleImage elevation={1} selected={selected} layout="cover" imageUrl={imageUrl || defaultImageUrl} className={classes.image} />
            </figure>
            { selected && <NavToolbar selectable={selectable} selected={selected} className={classes.toolbar} /> || <NavToolbar className={classes.toolbar} {...props} /> }
            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle title={title} status={status} onClick={onClick && undefined || onEdit} />
                </header>
                <div className={classes.body}>
                    <ModuleLabel label={documentLabel || documentType} />
                    { status &&  <ModuleStatus status={statusLabel || status} /> }
                </div>
                <footer className={classes.footer}>
                    <ModuleByline author={author} datetime={datetime} />
                </footer>
            </div>
        </ModuleBase>
    )    

}


GalleryModule.propTypes = {
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

export default GalleryModule;

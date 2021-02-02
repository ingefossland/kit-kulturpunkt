import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonBase from "@material-ui/core/ButtonBase"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"

import { NavToolbar, ButtonSelect } from "../NavToolbar"
import { NavSettings } from "../NavSettings"

import {
    ModuleBase,
    ModuleTitle,
    ModuleImage,
    ModuleLabel,
    ModuleIdentifier,
    ModuleDescription,
    ModuleStatus,
    ModuleByline,
    ModuleSelect
} from "../Module"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        backgroundColor: "transparent",
        position: "relative",
        width: props => { return props.width },
        userSelect: "none",
        marginBottom: 8,

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
        height: props => { return props.maxHeight},
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
        height: props => { return props.maxHeight },

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
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: theme.spacing(.5)
    },
    producer: {
        fontSize: 14,
        lineHeight: 1.5,
        fontWeight: "normal",
        color: theme.palette.text.secondary,
        maxWidth: "100%",

    },
    title: {
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: "bold",
        color: theme.palette.text.primary,
        maxWidth: "100%",
    },
    body: {
        marginTop: theme.spacing(.5),
        width: "100%",
        flexBasis: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        "& > * + *": {
            marginLeft: theme.spacing(.5)
        }
    },
    footer: {
        width: "100%",
        flexBasis: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: theme.spacing(.5),
        "& > * + *": {
            marginTop: theme.spacing(.5)
        }
    }
}));

const GalleryModule = ({
    width = 180, 
    maxWidth = "100%", 
    maxHeight = 180, 
    mediaStyle, 
    mediaLayout = "cover", 

    selected,
    onClick,

    title,
    label,
    identifier,
    imageUrl,

    producer = {},
    dating = {}

}) => {

    if (maxWidth) {
        width = maxWidth
    }

    const classes = useStyles({
        width: width,
        maxHeight: maxHeight,
    })

    const defaultImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="

    const ModuleFooter = () => {
        return (
            <footer className={classes.footer}>
                <ModuleLabel>{label}</ModuleLabel>
                <ModuleIdentifier>{identifier}</ModuleIdentifier>
            </footer>
        )
    }

    return (
        <article className={classes.module} aria-selected={selected} onClick={onClick}>
            <figure className={classes.media} role={onClick && "button"} aria-selected={selected}>
                <ModuleImage elevation={1} selected={selected} layout="cover" imageUrl={imageUrl || defaultImageUrl} className={classes.image} />
            </figure>
            <div className={classes.toolbar}>
                <ModuleSelect selected={selected} />
            </div>
            <div className={classes.content}>
                <header className={classes.header}>
                    <Typography variant="h2" noWrap className={classes.title}>{title}</Typography>
                    <Typography variant="h3" noWrap className={classes.producer}>{producer.name}</Typography>
                </header>
            </div>
        </article>
    )    

}


GalleryModule.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
}

export default GalleryModule;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ModuleTitle,
    ModuleImage,
    ModuleLabel,
    ModuleIdentifier,
    ModuleDescription,
    ModuleSelect,
    ModuleToolbar
} from "../Module"

import { makeStyles } from '@material-ui/core/styles';
import { getImageUrl } from "./utils"

const useStyles = makeStyles(theme => ({
    module: {
        backgroundColor: "transparent",
        position: "relative",
        width: props => { return props.width },
        maxWidth: props => { return props.maxWidth },
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

        }

    },
    placeholder: {
        display: "block",
        position: "relative",
        border: "1px solid",
        borderColor: theme.palette.divider,
        width: "100%",
        height: props => { return props.mediaHeight},
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "&[role=button]": {
            cursor: "pointer",
        },

        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        
    },
    media: {
        display: "block",
        backgroundColor: theme.palette.action.selected,
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
        position: "relative",
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
        marginTop: theme.spacing(.5),

        "& + $footer": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
            paddingTop: theme.spacing(.5)
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
    placeholder,
    children,
    onClick,

    width = "100%", 
    maxWidth = 180, 
    mediaWidth = 180,
    mediaHeight = 180,
    mediaStyle, 
    mediaLayout = "cover", 

//    selectable,
//    selected,
//    onSelect,

    title,
    description,
    label,
    identifier,
//    imageUrl,

    ...props
    
}) => {

    const { selected } = props

    const classes = useStyles({
        width: width,
        maxWidth: maxWidth,
        mediaWidth: mediaWidth,
        mediaHeight: mediaHeight,
    })

    const imageUrl = getImageUrl(props)
    const defaultImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="

    if (placeholder) {
        return (
            <div className={classes.module}>
                <div className={classes.placeholder} role={onClick && "button"} onClick={onClick}>
                    { children || title }
                </div>
            </div>
        )
    }

    const ModuleHeader = () => {
        return (
            <header className={classes.header}>
                <ModuleTitle>{title}</ModuleTitle>
                <ModuleDescription>{description}</ModuleDescription>
            </header>
        )

    }

    const ModuleFooter = () => {
        return (
            <footer className={classes.footer}>
                <ModuleIdentifier>{identifier}</ModuleIdentifier>
            </footer>
        )

        return (
            <footer className={classes.footer}>
                <ModuleLabel>{label}</ModuleLabel>
                <ModuleIdentifier>{identifier}</ModuleIdentifier>
            </footer>
        )
    }

    return (
        <article className={classes.module} aria-selected={selected}>
            <figure className={classes.media} role={onClick && "button"} aria-selected={selected} onClick={onClick}>
                <ModuleImage elevation={1} selected={selected} layout="cover" imageUrl={imageUrl || defaultImageUrl} className={classes.image} />
            </figure>
            <div className={classes.content}>
                <ModuleHeader />
                <ModuleFooter />
            </div>
            <ModuleToolbar className={classes.toolbar} {...props} />
        </article>
    )    

}


GalleryModule.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
}

export default GalleryModule;

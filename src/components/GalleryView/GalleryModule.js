import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ModuleBase,
    ModuleTitle,
    ModuleIcon,
    ModuleStatus,
    ModuleDate,
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

            "& $image": {
                opacity: .5
            }

        },

        "&[data-deleted=true]": {

            "& h2": {
                color: theme.palette.text.secondary,
                textDecoration: "line-through"
            },

            "& $image, &:hover $image": {
                opacity: .25
            },

            "& button[name=restore]": {
                opacity: 1,
            },

        },        

        "&[data-erased=true]": {

            "& *": {
                color: theme.palette.action.disabled,
            },

            "& $image, &:hover $image": {
                opacity: ".25"
            },

            "& button": {
                opacity: 0
            },

            "& h2": {
                textDecoration: "line-through"
            }

        },

        "&[aria-selected=true]": {

            "& $image, &:hover $image": {
                transform: "scale(0.8)",
                boxShadow: theme.shadows[2],
                opacity: 1,
            },

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
    },
    icon: {
        position: "absolute",
        left: 0,
        bottom: 0,
        margin: theme.spacing(2)
    },
    image: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        transformOrigin: "50% 50%",
        transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1)",
        transform: "scale(1)",

        backgroundPosition: "50% 50%",
        backgroundImage: props => { return "url("+props.imageUrl+")" },
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        "& > img": {
            display: "none",
        }

    },
    toolbar: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& button": {
            position: "absolute",
//            color: "white",

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
        marginTop: theme.spacing(1),
    },
    footer: {
        width: "100%",
        flexBasis: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: theme.spacing(.5),
        "& > * + *": {
            marginLeft: theme.spacing(1)
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

    icon,
    icons = [],
    documentType,
    mediaType,

    title,
    description,
    label,
    identifier,

    status,
    statusLabel,

    updatedAt,
    createdAt,

    ...props
    
}) => {

    const { selected } = props

    const imageUrl = getImageUrl(props)
    const defaultImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="

    const classes = useStyles({
        width: width,
        maxWidth: maxWidth,
        mediaWidth: mediaWidth,
        mediaHeight: mediaHeight,
        imageUrl: imageUrl
    })

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
            </header>
        )

    }

    const ModuleFooter = () => {
        return (
            <footer className={classes.footer}>
                <ModuleStatus status={status}>{statusLabel}</ModuleStatus>
                <ModuleDate datetime={updatedAt || createdAt} />
            </footer>
        )

    }

    const ModuleMedia = () => {
        return (
            <figure className={classes.media} role={onClick && "button"} aria-selected={selected} onClick={onClick}>
                <div className={classes.image}><img src={imageUrl || defaultImageUrl} /></div>
                {!imageUrl && <ModuleIcon className={classes.icon} icon={icon} icons={icons} documentType={documentType} mediaType={mediaType}  /> }
                <ModuleToolbar className={classes.toolbar} {...props} />
            </figure>
        )
    }

    return (
        <ModuleBase {...props} className={classes.module}>
            <ModuleMedia />
            <div className={classes.content}>
                <ModuleHeader />
                <ModuleFooter />
            </div>
        </ModuleBase>
    )    

}


GalleryModule.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
}

export default GalleryModule;

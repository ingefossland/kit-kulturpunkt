import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ModuleTitle,
    ModuleImage,
    ModuleIcon,
    ModuleLabel,
    ModuleIdentifier,
    ModuleDescription,
    ModuleStatus,
    ModuleDate,
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

            "& $media": {
                padding: theme.spacing(2)
            },

            "& $image": {
                boxShadow: theme.shadows[2]
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
        height: theme.spacing(7),
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
        height: "auto",
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box"
    },
    image: {
        display: "block",
        width: "100%",
        maxWidth: "100%",
        height: "auto"
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

const MasonryModule = ({
    placeholder,
    children,
    onClick,

    width = "100%", 
    maxWidth, 
    mediaStyle, 
    mediaLayout = "cover", 

    icons,
    icon,

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

    const classes = useStyles({
        width: width,
        maxWidth: maxWidth,
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
                <ModuleStatus status={status}>{statusLabel}</ModuleStatus>
                <ModuleDate datetime={updatedAt || createdAt} />
            </footer>
        )

    }

    const ModuleMedia = () => {
        return (
            <figure className={classes.media} role={onClick && "button"} aria-selected={selected} onClick={onClick}>
                <img src={imageUrl || defaultImageUrl} className={classes.image} />
                <ModuleToolbar className={classes.toolbar} {...props} />
            </figure>
        )

        return (
            <figure className={classes.media} role={onClick && "button"} aria-selected={selected} onClick={onClick}>
                <img src={imageUrl || defaultImageUrl} className={classes.image} />
                <ModuleToolbar className={classes.toolbar} {...props} />
            </figure>
        )
    }


    return (
        <article className={classes.module} aria-selected={selected}>
            <ModuleMedia />
            <div className={classes.content}>
                <ModuleHeader />
                <ModuleFooter />
            </div>
        </article>
    )    

}


MasonryModule.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
}

export default MasonryModule;

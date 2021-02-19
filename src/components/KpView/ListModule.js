import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from "@material-ui/core/Icon"

import icons from "../KpIcons"
import { getImageUrl } from "./utils"


import {
    ModuleSelect,
    ModuleBase,
    ModuleTitle,
    ModuleImage,
    ModuleLabel,
    ModuleMetadata,
    ModuleDescription,
    ModuleIdentifier,
    ModuleToolbar,
    ModuleSettings,
    ModuleStatus,
    ModuleByline
} from "../Module"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        display: "flex",
        minHeight: theme.spacing(8),
        justifyContent: "flex-start",
        alignItems: "center",
        userSelect: "none",

        "& + $module": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

        "& button": {
            opacity: 0.5,

            "&:hover": {
                opacity: 1,
            },
    
        },

        "&:hover": {
            "& button": {
                opacity: .5,
            },
        },

        "&[aria-selected=true]": {
            backgroundColor: "white",

            "& button[value=select]": {
                opacity: 1,
            }

        },

        "&[data-deleted=true]": {

            "& button[value=restore]": {
                opacity: .5,

                "&:hover": {
                    opacity: 1,
                },
    
            },

            "& $image, & $icon": {
                opacity: .25
            },

            "& [data-name=title]": {
                color: theme.palette.text.disabled,
                textDecoration: "line-through"
            }

        },

        "&[data-erased=true]": {

            "& $image, & $icon": {
                opacity: .25
            },

            "& [data-name=title]": {
                color: theme.palette.text.disabled,
                textDecoration: "line-through"
            }

        }


    },

    media: {
        width: 48,
        height: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: 24,
        color: theme.palette.text.secondary,

        "& > svg": {
            fontSize: "inherit"
        }

    },
    image: {
        position: "relative",
        display: "block",
        width: 48,
        height: 48,
    },
    content: {
        flexGrow: 1,
        maxWidth: "100%",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: theme.spacing(1)
    },
    header: {
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "baseline",
        justifyContent: "flex-start",
        "& * + *": {
            marginLeft: theme.spacing(.5)
        }
    },
    footer: {
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "baseline",
        justifyContent: "flex-start",
        "& * + *": {
            marginLeft: theme.spacing(.5)
        }
    },
    settings: {
        zIndex: 3,
        display: "flex",
        flexWrap: "none",

        "& > * + *": {
            marginLeft: theme.spacing(-1)
        }

    },
    toolbar: {
        zIndex: 3,
        display: "flex",
        flexWrap: "none",

        "& > * + *": {
            marginLeft: theme.spacing(-1)
        },
    },
}));

/** ListModule for listing documents */

const ListModule = ({
    placeholder = false,
    children,

    uniqueId,

    untitled,
    title,
    description,
    label,
    identifier,

    onClick,

    startAdornment,

    selectable,
    selected,
    onSelect,

    ...props
}) => {

    const { author, datetime, documentType, documentLabel, mediaType, mediaLabel, metadata, onEdit, status, statusLabel, deleted, erased } = props

    const icon = props.icon || props.documentType && icons[props.documentType]

    const classes = useStyles()


    const imageUrl = getImageUrl(props)

    if (placeholder) {
        return (
            <div className={classes.item} onClick={onClick}>
                { children || title }
            </div>
        )
    }

    return (
        <ModuleBase className={classes.module} status={status} selected={selected} deleted={deleted} erased={erased} onClick={onClick}>

            { startAdornment || selectable &&
                <ModuleSelect 
                    selected={selected}
                    onClick={onClick ? undefined : onSelect}
                />
            }

            <div className={classes.media}>
                { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                { imageUrl && <ModuleImage className={classes.image} imageUrl={imageUrl} width={48} height={48} /> }
            </div>


            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle status={status} untitled={untitled} title={title} onClick={!onClick && onEdit} />
                    <ModuleStatus statusLabel={statusLabel} status={statusLabel || status} />
                    <ModuleByline author={author} datetime={datetime} />
                </header>
                <footer className={classes.footer}>
                    <ModuleLabel label={documentLabel || documentType || mediaLabel || mediaType} />
                    <ModuleMetadata metadata={metadata} />
                    <ModuleDescription description={description} />
                </footer>
            </div>
            <ModuleSettings {...props} className={classes.settings} />
            <ModuleToolbar {...props} className={classes.toolbar} />
        </ModuleBase>
    )    

}

ListModule.propTypes = {
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    editable: PropTypes.bool,
    onEdit: PropTypes.func,
    deletable: PropTypes.bool,
    onDelete: PropTypes.func,
    restorable: PropTypes.bool,
    onRestore: PropTypes.func,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    typeLabel: PropTypes.string,
    metadata: PropTypes.array,
    status: PropTypes.string,
    statusLabel: PropTypes.string,
    author: PropTypes.string,
    datetime: PropTypes.string,
    /** Whole object is clickable, will override any other onClick events */
    onClick: PropTypes.func,
}

ListModule.defaultProps = {
    editable: false,
    selectable: false,
    selected: false,
    deletable: false,
    restorable: false
}

export default ListModule;
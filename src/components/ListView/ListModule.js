import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from "@material-ui/core/Icon"
import { getImageUrl } from "./utils"

import {
    ModuleSelect,
    ModuleBase,
    ModuleTitle,
    ModuleIcon,
    ModuleImage,
    ModuleLabel,
    ModuleMetadata,
    ModuleDescription,
    ModuleIdentifier,
    ModuleToolbar,
    ModuleStatus,
    ModuleByline
} from "../Module"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        display: "flex",
        minHeight: props => { return props.minHeight},
        justifyContent: "flex-start",
        alignItems: "center",
        userSelect: "none",

        "& + $module": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

        "& > $toolbar": {
            opacity: 0
        },

        "&:hover": {
            "& > $toolbar": {
                opacity: 1
            }
        },

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected
        },

        "&[data-deleted=true]": {

            "& h2": {
                color: theme.palette.text.secondary,
                textDecoration: "line-through"
            },

            "& img": {
                opacity: .25
            }

        },

        "&[data-erased=true]": {

            "& *": {
                color: theme.palette.action.disabled,
            },

            "& img": {
                opacity: .25
            },

            "& button": {
                opacity: 0
            },

            "& h2": {
                textDecoration: "line-through"
            }

        },


    },

    media: {
        width: props => { return props.mediaSize},
        height: props => { return props.mediaSize},
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {

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
            marginLeft: theme.spacing(1)
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
//            marginLeft: theme.spacing(-1)
        },
    },
}));

/** ListModule for listing documents */

const ListModule = ({
    size = "medium",
    mediaSize = 36,
    minHeight = 48,
    placeholder = false,
    children,
    ...props
}) => {

    const { 
        uniqueId,

        documentType, 
        documentLabel, 
        mediaType,
        mediaLabel,
    
        createdAt,
        updatedAt,
    
        icon,
        icons = [],
    
        untitled,
        title,
        author,
        description,
        label,
        identifier,
        metadata,
    
        startAdornment,
    
        selectable,
        selected,
        onSelect,

        onEdit,
        onClick,
    
        status,
        statusLabel
    
    } = props

    if (size === "small") {
        mediaSize = 36
        minHeight = 48
    }

    if (size === "medium") {
        mediaSize = 40
        minHeight = 56
    }

    if (size === "large") {
        mediaSize = 56
        minHeight = 72
    }

    const classes = useStyles({mediaSize, minHeight})

    const imageUrl = getImageUrl(props)

    if (placeholder) {
        return (
            <div className={classes.item} onClick={onClick}>
                { children || title }
            </div>
        )
    }

    const ModuleMedia = () => {

        return (
            <div className={classes.media}>
                { !imageUrl && <ModuleIcon icons={icons} icon={icon} documentType={documentType} mediaType={mediaType} /> }
                { imageUrl && <ModuleImage imageUrl={imageUrl} /> }
            </div>
        )

    }

    const ModuleContent = () => {

        return (
            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle untitled={untitled} title={title} />
                    <ModuleStatus status={status}>{statusLabel || status}</ModuleStatus>
                    <ModuleByline author={author} datetime={updatedAt || createdAt} />
                </header>
            </div>
        )

        return (
            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle untitled={untitled} title={title} />
                    <ModuleByline author={author} datetime={updatedAt || createdAt} />
                </header>
                <footer className={classes.footer}>
                    <ModuleLabel label={label || documentLabel || documentType || mediaLabel || mediaType} />
                    <ModuleStatus statusLabel={statusLabel} status={statusLabel || status} />
                    <ModuleMetadata metadata={metadata} />
                    <ModuleDescription description={description} />
                </footer>
            </div>
        )

    }

    return (
        <ModuleBase {...props} className={classes.module}>
            { startAdornment || selectable &&
                <ModuleSelect 
                    selected={selected}
                    onClick={onClick ? undefined : onSelect}
                />
            }

            <ModuleMedia />
            <ModuleContent />
            <ModuleToolbar {...props} className={classes.toolbar} selectable={false} />

        </ModuleBase>
    )    

}

ListModule.propTypes = {
    size: PropTypes.oneOf(["small","medium","large"]),

    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,

    editable: PropTypes.bool,
    onEdit: PropTypes.func,

    deletable: PropTypes.bool,
    deleted: PropTypes.bool,
    onDelete: PropTypes.func,

    restorable: PropTypes.bool,
    onRestore: PropTypes.func,

    erasable: PropTypes.bool,
    erased: PropTypes.bool,
    onErase: PropTypes.func,

    status: PropTypes.string,
    statusLabel: PropTypes.string,

    documentType: PropTypes.string,
    documentLabel: PropTypes.string,

    mediaType: PropTypes.string,
    mediaLabel: PropTypes.string,

    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,

    metadata: PropTypes.array,

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
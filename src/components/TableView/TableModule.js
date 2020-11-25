import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from "@material-ui/core/Icon"

import { ButtonSelect, ButtonEdit, ButtonDelete, ButtonRestore, ButtonLink, ButtonView } from ".."

import {
    ModuleTitle,
    ModuleLabel,
    ModuleMetadata,
    ModuleDescription,
    ModuleStatus,
    ModuleByline
} from "@kit-ui/admin"


import { NavSettings } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        display: "flex",
        minHeight: theme.spacing(8),
        justifyContent: "flex-start",
        alignItems: "center",
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
            }

        }

    },

    media: {
        minWidth: 48,
        width: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: 36,

        "& > svg": {
            fontSize: "inherit"
        }

    },
    image: {
        display: "block",
        width: 48,
    },
    content: {
        flexGrow: 1,
        overflow: "hidden",
        display: "flex",

        justifyContent: "space-between",
        margin: theme.spacing(1),

        "& > *": {
            flexBasis: 0,
            flexGrow: 1
        }

    },
    row: {
        display: "flex",
        alignItems: "baseline",
        "& > * + *": {
            marginLeft: theme.spacing(.5)
        }
    },
    col: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
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

/** ListViewModule for listing documents */

const ListModule = ({
    status,
    statusLabel,

    mediaType,
    mediaLabel,

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

    title,
    untitled,
    description,
    metadata,
    author,
    datetime,

    onClick,
    ...props
}) => {

    const classes = useStyles()

    const Toolbar = () => {
        return (
            <div className={classes.toolbar}>
                { editable && <ButtonEdit className={classes.edit} onClick={onEdit} /> }
                { viewable && <ButtonView className={classes.view} onClick={onView} /> }
                { linkable && <ButtonLink className={classes.link} onClick={onLink} /> }
                { deletable && <ButtonDelete className={classes.delete} onClick={onDelete} /> }
                { deleted && restorable && <ButtonRestore className={classes.restore} onClick={onRestore} /> }
            </div>
        )
    }


    return (
        <article className={classes.module} data-status={status} aria-selected={selected} data-deleted={deleted} data-erased={erased}>

            { selectable && <ButtonSelect className={classes.select} selected={selected} onClick={onSelect} /> }

            <div className={classes.media}>
                { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                { imageUrl && <img className={classes.image} src={imageUrl} /> }
            </div>


            <div className={classes.content}>
                <header className={classes.col}>
                    <ModuleTitle status={status} untitled={untitled} title={title} onClick={!onClick && onEdit} />
                    <ModuleDescription description={description} />
                    <div className={classes.row}>
                        <ModuleLabel label={documentLabel || documentType || mediaLabel || mediaType} />
                        <ModuleMetadata metadata={metadata} />
                    </div>
                </header>
                <footer className={classes.col}>
                    <ModuleStatus statusLabel={statusLabel} status={statusLabel || status} />
                    <ModuleByline author={author} datetime={datetime} />

                </footer>
            </div>
            <NavSettings {...props} className={classes.settings} />
            <Toolbar />
        </article>
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
//    size: "small",
    editable: false,
    selectable: false,
    selected: false,
    deletable: false,
    restorable: false
}

export default ListModule;

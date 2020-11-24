import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper"
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

import { NavToolbar, NavSettings } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        width: 256,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(1),

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
                opacity: .25
            }

        },

        "&[aria-selected=true]": {

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
    toolbar: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& button": {
            position: "absolute",

            "&[value=select]": {
                top: 0,
                left: 0,
                margin: theme.spacing(-2),
            },

            "&[value=delete],&[value=restore]": {
                top: 0,
                right: 0,
                margin: theme.spacing(-2),
            },

            "&[value=view]": {
                bottom: 0,
                left: 0,
                margin: theme.spacing(-2),
            },

            "&[value=link]": {
                bottom: 0,
                right: 0,
                margin: theme.spacing(-2),
            },

            "&[value=edit]": {
//                bottom: 0,
//                margin: theme.spacing(-1),
            },

            "&:hover": {
                opacity: 1
            }

        }        
    },    
    figure: {
        position: "relative",
        minWidth: 96,
        width: 96,
        minHeight: 96 * 4/3,
        padding: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& button": {
            margin: theme.spacing(-1)
        },

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.selected
        }

    },
    icon: {
        fontSize: 96,

        "& > svg": {
            fontSize: "inherit"
        }

    },
    image: {
        display: "block",
        width: 96,
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "& > *": {
            maxWidth: "100%",
            overflow: "hidden"
        }

    },
    status: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",

        "& > * + *": {
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

}));

/** GridModule for listing documents */

const GridModule = ({
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
    ...props
}) => {

    const classes = useStyles()

    const Toolbar = () => {
        return (
            <div className={classes.toolbar}>
                { selectable && <ButtonSelect className={classes.select} selected={selected} onClick={onSelect} /> }
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

            <Paper className={classes.figure} square={true}>
                { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                { imageUrl && <img className={classes.image} src={imageUrl} /> }

                <Toolbar />

            </Paper>

            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle status={status} untitled={untitled} title={title} onClick={!onClick && onEdit} />
                    <div className={classes.status}>
                        <ModuleLabel label={documentLabel || documentType} />
                        <ModuleStatus statusLabel={statusLabel} status={statusLabel || status} />
                    </div>
                </header>
                <footer className={classes.footer}>
                    <ModuleByline author={author} datetime={datetime} />
                </footer>
            </div>
            <NavSettings {...props} className={classes.settings} />
        </article>
    )    

}

GridModule.propTypes = {
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
    metadata: PropTypes.array,
    status: PropTypes.string,
    statusLabel: PropTypes.string,
    author: PropTypes.string,
    datetime: PropTypes.string,
    /** Whole object is clickable, will override any other onClick events */
    onClick: PropTypes.func,
}

GridModule.defaultProps = {
//    size: "small",
    editable: false,
    selectable: false,
    selected: false,
    deletable: false,
    restorable: false
}

export default GridModule;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from "@material-ui/core/Icon"

import { ButtonSelect } from ".."

import {
    ModuleBase,
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
        width: 256,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    media: {
        minWidth: 96,
        width: 96,
        minHeight: 96,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: 96,

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

        "& button": {
            opacity: .5,

            "&:hover": {
                opacity: 1
            }

        }        
    },

    uploadProgress: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    progress: {
        position: "absolute",
        backgroundColor: theme.palette.primary.main,
//        opacity: 0.25,
        height: theme.spacing(.25),
        top: "auto",
        right: "auto",
        bottom: 0,
        left: 0,
        width: props => { return props.uploadProgress + "%" }
    }

}));

/** ListModule for listing documents */

const ListModule = ({
    selectable,
    selected,
    onSelect,
    uploadProgress, icon, imageUrl, untitled, typeLabel, type, title, description, metadata, status, statusLabel, author, datetime, onClick, ...props
}) => {

    const classes = useStyles({uploadProgress: uploadProgress})

    return (
        <article className={classes.module}>

            { selectable && <ButtonSelect selected={selected} onClick={onSelect} /> }

            <div className={classes.media}>
                { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                { imageUrl && <img className={classes.image} src={imageUrl} /> }
            </div>


            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle status={status} untitled={untitled} title={title} onClick={!onClick && props.onEdit} />
                    <ModuleStatus statusLabel={statusLabel} status={statusLabel || status} />
                    <ModuleByline author={author} datetime={datetime} />
                </header>
                <footer className={classes.footer}>
                    <ModuleLabel label={typeLabel || type} />
                    <ModuleMetadata metadata={metadata} />
                    <ModuleDescription description={description} />
                </footer>
            </div>
            { uploadProgress && 
                <div className={classes.uploadProgress}>
                    <div className={classes.progress}></div>
                </div>                
            }
            <NavSettings {...props} className={classes.settings} />
            <NavToolbar {...props} className={classes.toolbar} />
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

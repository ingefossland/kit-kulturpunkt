import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper"
import Icon from "@material-ui/core/Icon"

import {
    ModuleBase,
    ModuleTitle,
    ModuleImage,
    ModuleLabel,
    ModuleMetadata,
    ModuleDescription,
    ModuleStatus,
    ModuleByline,
    ModuleSelect,
    ModuleToolbar,
    ModuleSettings
} from "../Module"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        width: 192,
        minWidth: 192,
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

            "&:hover": {

                "& $image, & $icon": {
                    opacity: 1
                },
    
            },

            "& $figure": {
                boxShadow: "none",
                outline: "1px solid",
                outlineColor: theme.palette.action.selected
            },

            "& button[name=select]": {
                opacity: 1,
            }

        },

        "&[data-deleted=true]": {

            "& button[name=restore]": {
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

            "&[name=select]": {
                top: 0,
                left: 0,
                margin: theme.spacing(-2),
            },

            "&[name=delete],&[name=restore]": {
                top: 0,
                right: 0,
                margin: theme.spacing(-2),
            },

            "&[name=view]": {
                bottom: 0,
                left: 0,
                margin: theme.spacing(-2),
            },

            "&[name=link]": {
                bottom: 0,
                right: 0,
                margin: theme.spacing(-2),
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

/** IconModule for listing documents */

const IconModule = (props) => {

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

    const classes = useStyles()

    return (
        <ModuleBase className={classes.module} status={status} selected={selected} deleted={deleted} erased={erased} onClick={selected && onSelect}>

            <Paper className={classes.figure} square={true}>
                { !imageUrl && icon && <Icon className={classes.icon}>{icon}</Icon> }
                { imageUrl && <ModuleImage className={classes.image} imageUrl={imageUrl} /> }
                { selected && <ModuleToolbar selectable={selectable} selected={selected} className={classes.toolbar} /> || <ModuleToolbar className={classes.toolbar} {...props} /> }
            </Paper>

            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle untitled={untitled} title={title} onClick={!selected && onEdit} />
                    <div className={classes.status}>
                        <ModuleLabel label={documentLabel || documentType} />
                        <ModuleStatus statusLabel={statusLabel} status={statusLabel || status} />
                    </div>
                </header>
                <footer className={classes.footer}>
                    <ModuleByline author={author} datetime={datetime} />
                </footer>
            </div>
            <ModuleSettings {...props} className={classes.settings} />
        </ModuleBase>
    )    

}

IconModule.propTypes = {
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

IconModule.defaultProps = {
//    size: "small",
    editable: false,
    selectable: false,
    selected: false,
    deletable: false,
    restorable: false
}

export default IconModule;

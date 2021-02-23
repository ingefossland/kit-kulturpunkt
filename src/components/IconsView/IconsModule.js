import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from "@material-ui/core/ButtonBase"
import Paper from "@material-ui/core/Paper"
import Icon from "@material-ui/core/Icon"

import {
    ModuleBase,
    ModuleTitle,
    ModuleDate,
    ModuleLabel,
    ModuleImage,
    ModuleIcon,
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
        width: props => { return props.width },
        minWidth: props => { return props.minWidth },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "&[role=button]:hover": {
            cursor: "pointer"
        },

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

            "& h2": {
                color: theme.palette.text.secondary,
                textDecoration: "line-through"
            }


        },

        "&[data-erased=true]": {

            "& *": {
                color: theme.palette.text.disabled,
            },

            "& $image, & $icon": {
                opacity: .25
            },

            "& h2": {
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
    placeholder: {
        position: "relative",
        width: props => { return props.paperWidth },
        height: props => { return props.paperHeight },
        padding: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        border: "1px solid",
        borderColor: theme.palette.divider,

        "&[role=button]": {
            cursor: "pointer",

            "& > $icon": {
                opacity: .5
            },

            "&:hover > $icon": {
                opacity: 1
            }
    
        },

        "& > $icon": {
            fontSize: 24,
        }

    }, 
 
    paper: {
        position: "relative",
        width: props => { return props.paperWidth },
        height: props => { return props.paperHeight },
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
        fontSize: props => { return props.iconSize },

        "& > svg": {
            fontSize: "inherit"
        }

    },
    image: {
        display: "block",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& > img": {
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%"
        },

        "& > $icon": {
            position: "absolute",
            bottom: 0,
            left: 0,
            fontSize: 24,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(.5),
//            boxShadow: theme.shadows[2]
        }
        
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
            overflow: "hidden",
            marginTop: theme.spacing(.5)
        }

    },
    footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing(1),

        "& > *": {
            maxWidth: "100%",
            overflow: "hidden"
        }
    },

}));

/** IconModule for listing documents */

const IconModule = ({
    width,
    minWidth = 128,
    maxWidth,

    imageUrl,

    icons = [],
    icon,
    iconSize = 96,
    minIconSize = 24,
    maxIconSize = 96,

    minImageSize = 64,

    paperWidth,
    paperHeight,
    minPaperWidth = 48,

    documentType,
    documentLabel,

    mediaType,
    mediaLabel,

    ...props
}) => {

    if (!paperWidth) {
        paperWidth = iconSize
    }

    // iconSize
    
    if (iconSize < minIconSize) {
        iconSize = minIconSize
    } else if (iconSize > maxIconSize) {
        iconSize = maxIconSize
    }

    if (iconSize < minImageSize) {
        imageUrl = null
    }
 
    paperHeight = paperWidth * 4/3

    if (!width) {
        width = paperWidth + 24
    }

    const {
        button,
        placeholder,

        status,
        statusLabel,
    
        updatedAt,
        createdAt,

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
    
        untitled,
    
        title,
        description,
        metadata,
        author,
        datetime,
    
        onClick,
    } = props

    const classes = useStyles({width, minWidth, paperWidth, paperHeight, iconSize})

    if (placeholder) {
        return (
            <div className={classes.module}>
                <ModuleBase className={classes.placeholder} role={onClick && "button"} onClick={onClick}>
                    { icon && <Icon className={classes.icon}>{icon}</Icon> || title }
                </ModuleBase>
            </div>
        )
    }

    const ModuleMedia = () => {

        if (imageUrl) {

            return (
                <div className={classes.image}>
                    <img src={imageUrl} />
                    <ModuleIcon className={classes.icon} documentType={documentType} mediaType={mediaType} icon={icon} icons={icons} />
                </div>
            )

        } else {
            return (
                <ModuleIcon className={classes.icon} documentType={documentType} mediaType={mediaType} icon={icon} icons={icons} />
            )
        }

    }

    return (
        <ModuleBase className={classes.module} {...props}>

            <Paper className={classes.paper} square={true}>
                <ModuleMedia />
                <ModuleToolbar className={classes.toolbar} {...props} />
            </Paper>

            <div className={classes.content}>
                <header className={classes.header}>
                    <ModuleTitle untitled={untitled} title={title} onClick={!selected && onEdit} />
                    <ModuleStatus status={status}>{statusLabel || status}</ModuleStatus>
                </header>
                <footer className={classes.footer}>
                    <ModuleDate datetime={updatedAt || createdAt} />
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

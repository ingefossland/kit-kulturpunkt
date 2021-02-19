import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';

import {
    ModuleBase,
    ModuleMedia,
    ModuleTitle,
    ModuleLabel,
    ModuleMetadata,
    ModuleDescription,
    ModuleStatus,
    ModuleToolbar,
    ModuleByline,
} from "../Module"

import { NavSettings } from "../NavSettings"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        display: "flex",
        minHeight: theme.spacing(8),
        justifyContent: "flex-start",
        alignItems: "center",
        userSelect: "none",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        },

        "&[role=button]": {
            cursor: "pointer",

            "& *": {
                pointerEvents: "none"
            },

            "&[aria-selected=true]": {
            },

        },

        "&[data-elevated=true]": {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },

        "& + $module": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

        "&.sortable-helper": {
            borderTopColor: "transparent",
            boxShadow: theme.shadows[12],
            zIndex: 2000,
            "& $settings": {
                display: "none"
            },
            "& $toolbar": {
                display: "none"
            }
        },

        "&[data-status=erased]": {

            "& figure": {
                opacity: "0.5"
            },

            "& $content": {
                opacity: "0.5"
            }

        },

        "&[data-status=trash]": {

            "& figure": {
                opacity: "0.5"
            },

            "& $content": {
                opacity: "0.5"
            }

        },

    },
    badge: {
        "& .MuiBadge-badge": {
            pointerEvents: "none",
            margin: theme.spacing(1)
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
    media: {
        display: "flex",
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
}));

/** ListModule for listing documents */

const StartAdornment = ({startAdornment, badgeContent}) => {

    const classes = useStyles({})

    return (
        <Badge className={classes.badge} badgeContent={badgeContent} color="primary">
            {startAdornment}
        </Badge>
    )

}

const ListModule = ({imageUrl, icon, untitled, typeLabel, type, title, description, metadata, status, statusLabel, author, datetime, selected, onClick, ...props }) => {
    const classes = useStyles({})

    return (
        <ModuleBase {...props} className={classes.module} role={onClick && "button"} status={status} selected={selected} onClick={onClick}>
            <StartAdornment {...props} />
            <div className={classes.media}>

                { imageUrl && <ModuleMedia backgroundColor="transparent" imageUrl={imageUrl} width="48px" height="48px" /> || <Icon>{icon}</Icon> }

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
            <NavSettings {...props} className={classes.settings} />
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
//    size: "small",
    editable: false,
    selectable: false,
    selected: false,
    deletable: false,
    restorable: false
}

export default ListModule;

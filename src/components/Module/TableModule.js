import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ModuleBase from "./ModuleBase"
import ModulePrefix from "./ModulePrefix"
import ModuleActionbar from "./ModuleActionbar"

import ModuleMedia from './ModuleMedia';
import ModuleTitle from './ModuleTitle';
import ModuleLabel from './ModuleLabel';
import ModuleDescription from './ModuleDescription';
import ModuleMetadata from './ModuleMetadata';
import ModuleStatus from './ModuleStatus';
import ModuleByline from './ModuleByline';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        userSelect: "none",

        "& > td": {
            minHeight: theme.spacing(8),
        },

        "&[data-status=trash]": {
            "& figure": {
                opacity: "0.5"
            },
            "& $content": {
                opacity: "0.5"
            }
        },

        "& h2": {
            fontSize: "16px",
            lineHeight: "24px",
        },

        "& $primaryAction": {
            opacity: .5,
        },

        "& $actionbar": {
            opacity: .5,
        },

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
            "& $primaryAction": {
                opacity: 1,

                "& svg": {
                    opacity: 1
                }
            }
        },


        "&:hover": {
            "& $primaryAction": {
                opacity: 1,
                "& svg": {
                    opacity: 1
                }
            },
            "& $actionbar": {
                opacity: 1,
                "& button": {
                    opacity: .5,
                    "&:hover": {
                        opacity: 1,
                    }
                }
            }

        },

        "&[data-role=button]": {

            "&:hover": {
                cursor: "pointer",
            },


            "& *": {
//                pointerEvents: "none"
            },

            "& $primaryAction": {
                opacity: .5,
                /*
                "& svg": {
                    opacity: 0
                }*/
            },

            "&[aria-selected=true]": {
            },

        },
        
    },
    headerCell: {
        width: "50%",
        verticalAlign: "middle",
        padding: theme.spacing(1),
    },
    footerCell: {
        width: "50%",
        verticalAlign: "middle",
        padding: theme.spacing(1),
        position: "relative"
    },
    footer: {
        display: "flex",
        width: "100%",
    },
    actionCell: {
        width: theme.spacing(6),
        verticalAlign: "middle",
    },
    mediaCell: {
        width: theme.spacing(7),
        textAlign: "center",
        verticalAlign: "middle"
    },
    media: {
        position: "relative",
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    content: {
        width: "100%",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    metadata: {
        width: "100%",
        display: "flex",
        alignItems: "baseline",
        justifyContent: "flex-start",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "& * + *": {
            marginLeft: theme.spacing(.5)
        },
        "& > *": {
            lineHeight: "24px"
        }
    },
    primaryAction: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    actionbar: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    }
}));

const TableModule = ({ imageUrl, title, description, metadata, type, typeLabel, status, statusLabel, author, datetime, selected, onClick, onEdit, ...props }) => {

    const classes = useStyles()
    const defaultImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==";

    return (
        <ModuleBase {...props} component="tr" className={classes.root} status={status} selected={selected} role={onClick && "button"}>
            <td className={classes.actionCell} onClick={onClick}>
                <ModulePrefix className={classes.primaryAction} selected={selected} {...props} />
            </td>
            <td className={classes.mediaCell} onClick={onClick}>
                <ModuleMedia backgroundColor="transparent" imageUrl={imageUrl || defaultImageUrl} className={classes.media} />
            </td>            
            <td className={classes.headerCell} onClick={onClick}>
                <header className={classes.content}>
                    <ModuleTitle status={status} title={title} onClick={!onClick && onEdit || undefined} />
                    <div className={classes.metadata}>
                        <ModuleLabel label={typeLabel || type} />
                        <ModuleDescription description={description} />
                        <ModuleMetadata metadata={metadata} />
                    </div>
                </header>
            </td>
            <td className={classes.footerCell} onClick={onClick}>
                <div className={classes.content}>
                    <ModuleStatus component="h2" status={statusLabel || status} />
                    <div className={classes.metadata}>
                        <ModuleByline author={author} datetime={datetime} />
                    </div>
                </div>
                <ModuleActionbar {...props} className={classes.actionbar} />
            </td>
        </ModuleBase>
    )    

}

TableModule.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    typeLabel: PropTypes.string,
    status: PropTypes.string,
    statusLabel: PropTypes.string,
    author: PropTypes.string,
    datetime: PropTypes.string,
    onClick: PropTypes.func,
    onEdit: PropTypes.func,
}

export default TableModule;

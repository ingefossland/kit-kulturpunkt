import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';

import { ModuleTitle } from "../Module"
import { NavToolbar } from "../NavToolbar"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        userSelect: "none",

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


    },
    badge: {
        position: "relative",
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
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& * + *": {
            marginLeft: theme.spacing(.5)
        }
    },
    title: {
        flexGrow: 1,
        fontFamily: "Akkurat, sans-serif",
        color: theme.palette.text.primary,

        "&[data-untitled=true]": {
            color: theme.palette.text.secondary,
        }

    },
    body: {
        display: "flex",
        flexDirection: "column",

        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginBottom: theme.spacing(2),

        "& > * + *": {
            marginTop: theme.spacing(2)
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

const ImageAnnotationsArrayItemLayout = ({expanded, onToggle, onExpand, onCollapse, untitled, title, onClick, children, ...props }) => {
    const classes = useStyles({})

    return (
        <article className={classes.module} onClick={onToggle}>
            <header className={classes.header}>
                <StartAdornment {...props} />
                <ModuleTitle className={classes.title} untitled={untitled} title={title} />
                <NavToolbar {...props} className={classes.toolbar} />
            </header>
            { expanded && 
                <div className={classes.body}>
                    {children}
                </div>
            }
        </article>
    )    

}

ImageAnnotationsArrayItemLayout.defaultProps = {
}

export default ImageAnnotationsArrayItemLayout;

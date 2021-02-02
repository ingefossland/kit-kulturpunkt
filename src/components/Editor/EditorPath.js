import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import PathIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        maxWidth: "100%",
    },
    back: {
        marginLeft: theme.spacing(1),

        "& + $breadcrumbs": {
            marginLeft: theme.spacing(1),
        },

        [theme.breakpoints.up('sm')]: {
//            display: "none"
        }
    },
    breadcrumbs: {
        marginLeft: theme.spacing(2),

        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "24px",

        color: theme.palette.primary.main,

        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",

        "& a:hover": {
            cursor: "pointer"
        },

        "& li[aria-hidden=true]": {
            marginLeft: theme.spacing(.5),
            marginRight: theme.spacing(.5),
        },

        [theme.breakpoints.down('sm')]: {
            "& li": {
                display: "none",
            },
            "& li:last-child": {
                display: "block",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }
        },

    },
    identifier: {
/*        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        */
        whiteSpace: "nowrap",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: theme.palette.primary.main,
    },
    prefix: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "24px",
        marginRight: theme.spacing(1),

        [theme.breakpoints.down('xs')]: {
            display: "none"
        }

    },
    icon: {
        marginRight: theme.spacing(1)
    },
    parent: {
        display: "flex",
        color: theme.palette.text.primary
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "normal",
        lineHeight: "24px",

        "&[data-title=true]": {
            fontWeight: "bold",
        },
 
    },
    subtitle: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        lineHeight: "24px",
        marginLeft: theme.spacing(1),
    },
    uniqueId: {
        fontFamily: "Akkurat Mono, monospace",
        fontSize: "16px",
        lineHeight: "24px",
        textTransform: "uppercase",
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary
    }
}));

const ButtonBack = ({label, onClick}) => {
    const classes = useStyles()

    return (
        <IconButton className={classes.back} onClick={onClick}>
            <BackIcon />
        </IconButton>
    )

}

const EditorPath = ({className, status, parents = [], title, subtitle, identifier, untitled = "Untitled", onSelect, onBack}) => {
    const classes = useStyles();

    const _onSelect = (item, event) => {
        if (onSelect) {
            onSelect(item, event)
        }
    }
   
    const _onBack = (event) => {
        if (onBack) {
            onBack(event)
        }
    }

    if (parents && parents.length) {
        return (
            <div className={className}>
                <ButtonBack className={classes.back} onClick={(event) => _onBack(event)} />
                <Breadcrumbs className={classes.breadcrumbs} separator={<PathIcon />}>
                    { parents && parents.map((parent, index) => {
                        return (
                            <Link className={classes.parent} noWrap={true} onClick={(event) => _onSelect(parent, event)} key={index}>{parent.title}</Link>
                        )
                    })}
                    <Typography className={classes.identifier} data-status={status} noWrap={true}>
                        <b className={classes.title} data-status={status} data-title={title && true}>{title || untitled}</b>
                        { subtitle && <i className={classes.subtitle}>{subtitle}</i> }
                        { identifier && <i className={classes.uniqueId}>{identifier}</i> }
                    </Typography>
                </Breadcrumbs>
            </div>
        )
    }

    return (
        <div className={className}>
            <ButtonBack onClick={(event) => _onBack(event)} />
            <Breadcrumbs className={classes.breadcrumbs} separator={<PathIcon />}>
                <Typography className={classes.identifier} data-status={status} noWrap={true}>
                    <b className={classes.title} data-status={status} data-title={title && true}>{title || untitled}</b>
                    { subtitle && <i className={classes.subtitle}>{subtitle}</i> }
                    { identifier && <i className={classes.uniqueId}>{identifier}</i> }
                </Typography>
            </Breadcrumbs>
        </div>
    )

}

export default EditorPath;
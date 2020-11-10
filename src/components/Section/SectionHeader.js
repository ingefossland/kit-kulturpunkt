import React, { Component } from 'react';

import ButtonCollapsible from "./ButtonCollapsible"
import NavToolbar from "../NavToolbar/NavToolbar"
import NavSettings from "../NavSettings/NavSettings"

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        alignItems: "center",
        minHeight: theme.spacing(7),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        userSelect: "none",
        "&[aria-expanded=true]": {
            minHeight: theme.spacing(8)
        },
    },
    content: {
        flexGrow: 1,
        maxWidth: "100%",

        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        "&[data-toggle=true]:hover": {
            cursor: "pointer"
        }
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        letterSpacing: 0,

        "&[data-untitled=true]": {
            color: theme.palette.text.secondary
        }

    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "16px",
        fontWeight: "normal",
        letterSpacing: 0,
            opacity: ".6",
        marginLeft: theme.spacing(1)
    },
    settings: {
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        flexWrap: "none"
    },
    toolbar: {
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        flexWrap: "none",

        "& button": {
            opacity: .5,

            "&:hover": {
                opacity: 1
            }

        }        
    },

}));

const SectionHeader = ({title, untitled = "Untitled", description, startAdornment, collapsible, editable, expanded, onToggle, ...props}) => {
    const classes = useStyles()

    const hasToggle = collapsible || editable
    const hideToolbar = editable && expanded

    return (
        <header className={classes.header} aria-expanded={expanded}>
            { !expanded && startAdornment && <div className={classes.startAdornment}>{ startAdornment }</div> }
            { collapsible && <ButtonCollapsible expanded={expanded} onClick={onToggle} /> }
            <Typography noWrap className={classes.content} data-toggle={hasToggle} onClick={hasToggle ? onToggle: undefined}>
                <span className={classes.title} data-untitled={!title && true}>{title || untitled}</span>
                { !expanded && description && <span className={classes.description}>{description}</span> }
            </Typography>
            <NavSettings {...props} className={classes.settings} />
            {!hideToolbar && <NavToolbar {...props} className={classes.toolbar} editable={editable} /> }
        </header>
    )

}

export default SectionHeader;

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PathIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
    path: {
        listStyle: "none",

        '& li[aria-hidden]': {
            marginLeft: theme.spacing(.5),
            marginRight: theme.spacing(.5)
        },

        "& .MuiBreadcrumbs-li": {
            fontFamily: "Akkurat, sans-serif",
            fontWeight: "bold",
            fontSize: 18,
            lineHeight: 1.5,
            color: "inherit",
        }

    },
    link: {
        color: theme.palette.primary.main,
        color: theme.palette.text.primary,

        "&:hover": {
            cursor: "pointer"
        }

    },
    header: {
        display: "flex",
        alignItems: "baseline",
        "& > * + *": {
            marginLeft: theme.spacing(.5),
        }
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        color: theme.palette.primary.main,
        fontSize: 18,
        lineHeight: 1.5,
        fontWeight: "bold",
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
        lineHeight: 1.5,
        color: theme.palette.text.secondary,
        fontWeight: "normal",
    },
    identifier: {
        fontFamily: "Akkurat mono, Akkurat, sans-serif",
        fontSize: 16,
        lineHeight: 1.5,
        textTransform: "uppercase",
        color: theme.palette.text.secondary,

        "&:before": {
            content: '"["'
        },
        "&:after": {
            content: '"]"'
        }

    },

}));


const NavPath = ({className, parents, title, untitled, description, identifier, onSelect, children}) => {

    const classes = useStyles()

    const _onSelect = (item) => {
        item.onClick && item.onClick()
        onSelect && onSelect(item)
    }

    const NavPathLink = ({title, label, onClick}) => {

        return (
            <Link className={classes.link} onClick={onClick}>
                { title || label }
            </Link>
        )


    }

    const NavPathTitle = ({children}) => {

        return (
            <Typography className={classes.title} noWrap={true}>
                {children}
            </Typography>
        )
        
    }

    const NavPathDescription = ({children}) => {

        return (
            <Typography className={classes.description} noWrap={true}>
                {children}
            </Typography>
        )
        
    }

    const NavPathIdentifier = ({children}) => {

        return (
            <div className={classes.identifier}>
                {children}
            </div>
        )
        
    }

    const header = title || description || identifier

    return (
        <Breadcrumbs className={className || classes.path} separator={<PathIcon />}>
            {parents && parents.map((parent, index) => <NavPathLink key={index} {...parent} onClick={(event) => _onSelect(parent, event)} /> )}

            { header &&
                <div className={classes.header}>
                    { title && <NavPathTitle>{title}</NavPathTitle> }
                    { description && <NavPathDescription>{description}</NavPathDescription> }
                    { identifier && <NavPathIdentifier>{identifier}</NavPathIdentifier> }
                </div>
            }

            {children}
        </Breadcrumbs>
    )


}

export default NavPath;
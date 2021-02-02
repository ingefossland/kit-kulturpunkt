import React, { useEffect, useState } from "react"

import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        width: "100%",
        display: "flex",
    },
    icon: {
        marginRight: theme.spacing(1)
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 27,
        lineHeight: 1.25,
        fontWeight: "bold",
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
        fontWeight: "normal"
    },
}));

const ArticleHeader = ({icon, title, description}) => {

    const classes = useStyles()

    return (
        <header className={classes.header}>
            {icon && <Icon className={classes.icon}>{icon}</Icon>}
            <Typography component="h1" className={classes.title}>{title}</Typography>
        </header>
    )
    
    return (
        <header className={classes.header}>
            <h1 className={classes.title}>{title}</h1>
            <h2 className={classes.description}>{description}</h2>
        </header>
    )


}

export default ArticleHeader;
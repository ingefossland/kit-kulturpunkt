import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    item: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 1,
        color: "inherit",
        "&[data-url]": {
            cursor: "pointer"
        }
    }
}));

const PathItem = ({color = "primary", url, onClick, children}) => {
    const classes = useStyles();

    if (url || onClick) {
        return (
            <Link color={color} className={classes.item} href={!onClick && url} data-url={url} onClick={onClick}>
                { children }
            </Link>
        )
    }

    return (
        <Typography className={classes.item} href={url}>
            { children }
        </Typography>
    )

}

export default PathItem
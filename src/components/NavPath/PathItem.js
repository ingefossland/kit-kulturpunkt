import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: "18px",
        lineHeight: "24px",
        color: "inherit",
        "&[data-url]": {
            cursor: "pointer"
        }
    }
}));

const PathItem = ({url, onClick, children}) => {
    const classes = useStyles();

    if (url) {
        return (
            <Link className={classes.root} href={!onClick && url} data-url={url} onClick={onClick}>
                { children }
            </Link>
        )
    }

    return (
        <Typography className={classes.root} href={url} onClick={onClick}>
            { children }
        </Typography>
    )

}

export default PathItem
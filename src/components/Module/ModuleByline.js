import React from 'react';
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import ModuleDate from "./ModuleDate"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    byline: {
//        display: "flex",
//        alignItems: "baseline",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        color: theme.palette.text.secondary,
    },
    author: {
        display: "inline",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: "normal",
    },
    datetime: {
        display: "inline",
        fontStyle: "normal",
        fontWeight: "normal"
    }
}));

const ModuleByline = ({author, datetime, locale = "nb", format = "relative"}) => {
    const classes = useStyles()

    if (!datetime) {
        return false
    }

    return (
        <Typography className={classes.byline} noWrap={true} component="h3">
            <ModuleDate datetime={datetime} locale={locale} format={format} className={classes.datetime} />
            {' '}
            <b className={classes.author}>by {author}</b>
        </Typography>
    )
}

ModuleByline.propTypes = {
    author: PropTypes.string,
    datetime: PropTypes.string,
    locale: PropTypes.string,
    format: PropTypes.string,
};

export default ModuleByline;
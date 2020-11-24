import React from 'react';
import moment from 'moment';
import "moment/locale/nb";
import "moment/locale/nn";
import "moment/locale/sv";

import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        color: theme.palette.text.secondary
    }
}));

/** Module date, uses moment.js */

const ModuleDate = ({className, locale = "nb", datetime, format = "relative"}) => {
    const classes = useStyles()

    if (!datetime) {
        return false
    }

    // format value

    moment.locale(locale)

    let date;
    
    if (format === "relative") {
        date = moment(datetime).fromNow()
    } else if (format) {
        date = moment(datetime).format(format)
    } else {
        date = moment(datetime).format()
    }

    return (
        <time dateTime={datetime} className={className || classes.root}>{date}</time>
    )
}

ModuleDate.propTypes = {
    /** Locale string */
    locale: PropTypes.string,
    /** Datetime as YYYY-MM-DD */
    datetime: PropTypes.string,
    /** Moment.js format */
    format: PropTypes.string,
};

export default ModuleDate;
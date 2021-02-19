import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    identifier: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
//        width: "100%",
        flexGrow: 1,
        height: theme.spacing(8),
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        color: props => { return theme.palette.header && theme.palette.header.title || theme.palette.primary.contrastText },
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText,
        width: "1px",
        height: theme.spacing(3),
        opacity: 0.85,
        margin: theme.spacing(1.5),

        [theme.breakpoints.down('xs')]: {
            display: "none"
        },

    },
    subtitle: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "normal",
        opacity: 0.85,

        [theme.breakpoints.down('xs')]: {
            display: "none"
        },

    }
}));

const AppIdentifier = ({className, expanded, title, subtitle}) => {

    const classes = useStyles()

    return (
        <div className={className || classes.identifier} aria-expanded={expanded}>
            <Typography component="h1" className={classes.title} noWrap>{title}</Typography>
            { title && subtitle && <div className={classes.divider}></div> }
            <Typography component="h2" className={classes.subtitle} noWrap>{subtitle}</Typography>
        </div>
    )

}

AppIdentifier.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
}

export default AppIdentifier;
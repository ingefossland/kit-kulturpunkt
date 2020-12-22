import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    subview: {
        backgroundColor: theme.palette.background.default,
        color: "black",
    },
    section: {
        height: theme.spacing(8),
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    button: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        color: "inherit",

        "& + $content": {
            paddingRight: theme.spacing(8)
        }

    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        marginLeft: theme.spacing(1),
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "normal",
        marginLeft: "0.25em"
    }
}));

const AppSubview = ({className, expanded, title, description, onToggle}) => {
    const classes = useStyles()

    return (
        <div className={className || classes.subview} aria-expanded={expanded}>
            <div className={classes.section}>
                <IconButton className={classes.button} onClick={onToggle}>
                    <BackIcon />
                </IconButton>
                <div className={classes.content}>
                    <Typography component="h1" className={classes.title}>{title && description && title + ":" || title}</Typography>
                    <Typography component="h2" className={classes.description}>{description}</Typography>
                </div>
            </div>
        </div>
    )

}

AppSubview.propTypes = {
    className: PropTypes.string,
    expanded: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    onBack: PropTypes.func
}

export default AppSubview;
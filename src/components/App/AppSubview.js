import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';

import { NavPath } from "../NavPath"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    subview: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
    },
    section: {
        height: theme.spacing(8),
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: "inherit"
    },
    back: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

const AppSubview = ({className, expanded, parents, title, description, onBack, onSelect}) => {
    const classes = useStyles()

    const _onSelect = (item, event) => {
        onSelect && onSelect(item, event)
    }
   
    const _onBack = (event) => {
        if (onBack) {
            onBack(event)
        } else if (onSelect && parents.length) {
            onSelect(parents[parents.length-1], event)
        }
    }

    return (
        <div className={className || classes.subview} aria-expanded={expanded}>
            <div className={classes.section}>
                <IconButton className={classes.back} onClick={_onBack}>
                    <BackIcon />
                </IconButton>
                <NavPath parents={parents} title={title} description={description} onSelect={_onSelect} />
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
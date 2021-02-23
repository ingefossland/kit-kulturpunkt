import React from 'react';
import PropTypes from "prop-types"
import Icon from "@material-ui/core/Icon"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
    },
}));

const ModuleIcon = ({className, documentType, mediaType, icons = [], icon}) => {
    const classes = useStyles()

    if (!icon && documentType && icons && icons[documentType]) {
        icon = icons[documentType]
    }

    if (!icon && mediaType && icons && icons[mediaType]) {
        icon = icons[mediaType]
    }

    return (
         <Icon className={className || classes.icon}>{icon}</Icon>
    )
}

ModuleIcon.propTypes = {
    icons: PropTypes.array
}

export default ModuleIcon
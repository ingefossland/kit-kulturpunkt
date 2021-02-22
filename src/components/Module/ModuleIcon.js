import React from 'react';
import PropTypes from "prop-types"
import Icon from "@material-ui/core/Icon"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
    },
    cropbox: {
        display: "block",
        position: "absolute",
//        backgroundColor: props => { return props.backgroundColor },
        boxShadow: props => { return props.elevation && theme.shadows[props.elevation] },
        backgroundColor: theme.palette.action.selected,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
        overflow: "hidden",
        opacity: "1",
        transformOrigin: "50% 50%",
        transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1)",
        transform: "scale(1)",
        userSelect: "none",
        "&[aria-selected=true]": {
            transform: "scale(0.8)",
        }
    },
    image: {
        display: "block",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",        
        maxWidth: props => { return props.maxWidth },
        maxHeight: props => { return props.maxHeight },
        margin: "auto"
    },
}));

const ModuleIcon = ({className, icon}) => {
    const classes = useStyles()

    return (
         <Icon className={className || classes.icon}>{icon}</Icon>
    )
}

ModuleIcon.propTypes = {
}

export default ModuleIcon;
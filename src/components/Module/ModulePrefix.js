import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types"

import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

//import ButtonDraggable from "../NavToolbar/ButtonDraggable"
//import ButtonCollapsible from "../NavToolbar/ButtonCollapsible"
import ModuleSelect from "./ModuleSelect"

const ButtonDraggable = () => (<p>drag</p>)
const ButtonCollapsible = () => (<p>collapse</p>)

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        margin: theme.spacing(1.5)
    }
}));

const ModulePrefix = ({ className, startAdornment, icon, onClick, selectable, selected, onSelect }) => {

    const classes = useStyles()

    if (startAdornment) {
        return (
            <div className={className || classes.root}>
                { startAdornment }
            </div>
        )    
    }

    if (selectable) {
        return (
            <div className={className || classes.root}>
                { selectable && <ModuleSelect selected={selected} onClick={onSelect} /> }
            </div>
        )    
    }

    if (icon && onClick) {
        return (
            <IconButton className={className || classes.root} onClick={onClick}>
                <Icon>{icon}</Icon>
            </IconButton>
        )    
    }

    if (icon) {
        return (
            <div className={className || classes.root}  >
                <Icon className={classes.icon}>{icon}</Icon>
            </div>
        )    
    }

    return false

}

ModulePrefix.propTypes = {
    className: PropTypes.string,
    startAdornment: PropTypes.node,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    icon: PropTypes.string,
    onClick: PropTypes.func,
}

export default ModulePrefix;

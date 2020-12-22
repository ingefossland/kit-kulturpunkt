import React, { useState, useRef, forwardRef } from 'react';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: 1,
    },
    icon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(-.5)
    },
    toggle: {
        borderRadius: 0,
        width: theme.spacing(5),
    },
}));

const ActionButton = ({className, forwardedRef, icon, role, size = "large", variant = "contained", color = "primary", disabled, expanded, controls, children, onClick, onToggle, ...item}) => {
    const { label, title } = item;

    const classes = useStyles()

    if (onClick && onToggle) {
        return (
            <ButtonGroup aria-label="action" color={color} ref={forwardedRef}>
                <Button size={size} variant={variant} className={className || classes.root} disabled={disabled} onClick={onClick}> 
                    { icon && <Icon className={classes.icon}>{icon}</Icon> }
                    { label || title }
                </Button>
                <Button size={size} variant={variant} disabled={disabled} className={classes.toggle}
                    size="small"
                    aria-controls={expanded ? controls : undefined}
                    aria-expanded={expanded ? 'true' : undefined}
                    aria-label="options"    
                    aria-haspopup="menu"
                    onClick={onToggle}>
                    <DropDownIcon />
                </Button>
            </ButtonGroup>
        )
    }

    if (onToggle) {
        return (
            <Button size={size} variant={variant} color={color} className={className || classes.root} disabled={disabled} onClick={onToggle} ref={forwardedRef}>
                { icon && <Icon className={classes.icon}>{icon}</Icon> }
                { label || title }
                <DropDownIcon />
            </Button>
        )
    }
    
    return (
        <Button size={size} variant={variant} color={color} className={className || classes.root} disabled={disabled} onClick={onClick}>
            { icon && <Icon className={classes.icon}>{icon}</Icon> }
            { label || title }
        </Button>
    )
}

export default ActionButton;
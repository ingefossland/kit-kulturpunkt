import React, { useState, useRef, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/RemoveRedEye';

import NavAction from "../NavAction/NavAction"

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: "14px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "inherit",
        fontWeight: "bold",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    primaryButton: {
        borderRadius: 0,
        minWidth: theme.spacing(7),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        height: theme.spacing(5),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
    },
    primaryToggle: {
        borderRadius: 0,
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    iconButton: {
        fontSize: "inherit",
        minWidth: theme.spacing(5),
        minHeight: theme.spacing(5),
        border: "1px solid",
        borderColor: "rgba(0,0,0,.25)",

        [theme.breakpoints.down('xs')]: {
            border: "none",
        },

    },
    icon: {
        fontSize: "18px",
    }
}));

const PrimaryButton = ({disabled, label, onClick}) => {
    const classes = useStyles()

    return (
        <Button variant="contained" color="primary" className={classes.primaryButton} disabled={disabled} onClick={onClick}>
            { label }
        </Button>
    )
}

const PrimaryComboButton = ({forwardedRef, disabled, expanded, controls, label, onClick, onToggle}) => {
    const classes = useStyles()

    return (
        <ButtonGroup aria-label="action" color="primary" ref={forwardedRef}>
            <Button variant="contained" className={classes.primaryButton} disabled={disabled} onClick={onClick}> 
                {label}
            </Button>
            <Button variant="contained" className={classes.primaryToggle}
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

const PrimaryIconButton = ({onClick, children}) => {

    const classes = useStyles()

    return (
        <ButtonBase className={classes.iconButton} onClick={onClick}>
            {children}
        </ButtonBase>
    )

}

const EditorAction = ({className, primaryAction}) => {
    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null);
    const classes = useStyles()

    if (!primaryAction) {
        return false
    }
   
    const handleToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const handleSelect = ({onClick}) => {
        onClick && onClick()
        setExpanded(false);
    }

//    const primaryAction = action && action[0]

    if (primaryAction && primaryAction.type === "view") {
        return (
            <nav className={className || classes.root}>
                <PrimaryIconButton {...primaryAction}>
                    <ViewIcon className={classes.icon} />
                </PrimaryIconButton>
            </nav>
        )
    } else if (primaryAction && primaryAction.type === "edit") {
        return (
            <nav className={className || classes.root}>
                <PrimaryIconButton {...primaryAction}>
                    <EditIcon className={classes.icon} />
                </PrimaryIconButton>
            </nav>
        )
    }

    // NavAction

    if (primaryAction) {
        return (
            <NavAction className={className || classes.root} menu={[primaryAction]} placement="bottom-end" />
        )
    }

    /*

    if (primaryAction && primaryAction.children) {

        return (
            <nav className={className || classes.root}>
                <PrimaryComboButton {...primaryAction} expanded={expanded} forwardedRef={anchorRef} onToggle={handleToggle} />
                <Popper open={expanded} style={{zIndex: 2000}}
                        role={undefined} transition anchorEl={anchorRef.current} placement="bottom-start">
                        <ClickAwayListener onClickAway={handleToggle}>
                            <div>
                            <Paper elevation={1} square={true} aria-expanded={expanded}>
                                <MenuList>
                                    {primaryAction.children.map((item, index) => (
                                        <MenuItem {...item} key={index} onClick={() => handleSelect(item)}>
                                            { item.label || item.title }
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Paper>
                            </div>
                        </ClickAwayListener>
                </Popper>
            </nav>
        )
        
    }

    if (primaryAction) {
        return (
            <nav className={className || classes.root}>
                <PrimaryButton {...primaryAction} />
            </nav>
        )
    }

    */

}

export default EditorAction;
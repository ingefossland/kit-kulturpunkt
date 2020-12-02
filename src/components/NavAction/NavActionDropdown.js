import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dropdown: {
        minWidth: props => { return props.minWidth },
    },
}));

const NavActionDropdown = ({className, minWidth = 192, open, anchorEl, placement, onClickAway, children}) => {

    const classes = useStyles({minWidth})

    return (
        <Popper open={open} style={{zIndex: 2000}}
            role={undefined} transition anchorEl={anchorEl} placement={placement}>
            <ClickAwayListener onClickAway={onClickAway}>
                <Paper className={className || classes.dropdown} elevation={16} square={true}>
                    {children}
                </Paper>
            </ClickAwayListener>
        </Popper>
    )
}

export default NavActionDropdown;
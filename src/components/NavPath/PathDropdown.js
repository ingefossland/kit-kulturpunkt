import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

//import "./SettingsDropdown.scss"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '6px',
        marginBottom: '6px'
    },
}));


const PathDropdown = ({children, expanded, onCollapse, anchorEl, placement = "bottom-start"}) => {
    const classes = useStyles()

    return (
        <Popper open={expanded} style={{zIndex: 2000}} role={undefined} transition anchorEl={anchorEl} placement={placement}>
            <ClickAwayListener onClickAway={onCollapse}>
                <Paper elevation={16} square={true} className={classes.root} aria-expanded={expanded}>
                    {children}
                </Paper>
            </ClickAwayListener>
        </Popper>
    )
}

export default PathDropdown
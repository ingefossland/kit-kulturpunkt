import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttongroup: {
        display: "flex",

        "& > * + *": {
            marginLeft: theme.spacing(1)
        }

    }
}));

const NavActionButtongroup = ({className, color = "primary", variant = "contained", children}) => {
    const classes = useStyles()

    return (
        <div color={color} variant={variant} className={className || classes.buttongroup}>
            { children }
        </div>
    )
}

export default NavActionButtongroup
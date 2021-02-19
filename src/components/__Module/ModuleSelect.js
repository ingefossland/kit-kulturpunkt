import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SelectIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        "& svg": {
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "currentColor"
        }        
    },
    select: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        borderRadius: "100%",
        border: "1px dotted",
        margin: 1,
        borderColor: "currentColor",

        opacity: .5,

        "&:hover": {
            opacity: 1
        }

    },
    selected: {
        display: "block",
        width: theme.spacing(3),
        height: theme.spacing(3),
        borderRadius: "100%",
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[2],
    }
}));

const ButtonSelectable = ({className, selected = false, onClick}) => {
    const classes = useStyles();

    if (selected) {

        return (
            <IconButton className={className || classes.button} aria-selected={selected} color="inherit" name="select" aria-label="select" onClick={onClick}>
                <div className={classes.selected}>
                    <SelectIcon />
                </div>
            </IconButton>
        )

    }

    return (
        <IconButton className={className || classes.button} aria-selected={selected} color="inherit" name="select" aria-label="select" onClick={onClick}>
            <div className={classes.select}>
                <SelectIcon />
            </div>
        </IconButton>
    )

}

export default ButtonSelectable;
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SelectIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        color: "inherit",
    },
    select: {
        color: "inherit",
        width: theme.spacing(3),
        height: theme.spacing(3),
        borderRadius: "100%",
        border: "1px solid",
        borderColor: "currentColor",
        margin: -1,
    },
    selected: {
        color: "inherit",
        display: "block",
        width: theme.spacing(3),
        height: theme.spacing(3),
        borderRadius: "100%",
        border: "2px solid",
        margin: -2,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[2],

        "& svg": {
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
//            color: "currentColor"
        }        

    }
}));

const ButtonSelectable = ({className, selected = false, onClick}) => {
    const classes = useStyles();

    if (selected) {

        return (
            <IconButton className={className || classes.button} aria-selected={selected} color="inherit" value="select" aria-label="select" onClick={onClick}>
                <div className={classes.selected}>
                    <SelectIcon />
                </div>
            </IconButton>
        )

    }

    return (
        <IconButton className={className || classes.button} aria-selected={selected} color="inherit" value="select" aria-label="select" onClick={onClick}>
            <SelectIcon />
        </IconButton>
    )

    return (
        <IconButton className={className || classes.button} aria-selected={selected} color="inherit" value="select" aria-label="select" onClick={onClick}>
            <div className={classes.select}>
                <SelectIcon />
            </div>
        </IconButton>
    )

}

export default ButtonSelectable;
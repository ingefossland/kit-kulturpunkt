import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SelectIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        width: theme.spacing(3),
        height: theme.spacing(3),

        border: "1px solid",
        margin: -1,
        borderColor: "transparent",

        "&[aria-selected=true]": {
            opacity: 1,
            margin: -2,
            border: "2px solid",
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: theme.shadows[2],

            "& > $check": {
                fontSize: 20
            }

        }
        
    },
    check: {
        color: "currentColor"
    },
    selectButton: {
        opacity: .5,

        "&:hover": {
            opacity: 1,
        },
        
        "&[aria-selected=true]" : {
            opacity: 1
        }
        
    },
    borderButton: {

        "& $icon": {
            border: "1px dotted",
            borderColor: "currentColor",
            opacity: .5,
        },

        "& $check": {
            fontSize: 20
        },

        "&[aria-selected=true] $icon" : {
            opacity: 1,
            margin: -2,
            border: "2px solid",
            borderColor: theme.palette.primary.main,
        }


    },
}));

const ModuleSelect = ({className, border = false, selected = false, onClick}) => {
    const classes = useStyles();

    if (border) {

        return (
            <IconButton className={className || classes.borderButton} aria-selected={selected} color="inherit" name="select" aria-label="select" onClick={onClick}>
                <Icon className={classes.icon} aria-selected={selected}>
                    <SelectIcon className={classes.check} />
                </Icon>
            </IconButton>
        )
        
    }

    return (
        <IconButton className={className || classes.selectButton} aria-selected={selected} color="inherit" name="select" aria-label="select" onClick={onClick}>
            <Icon className={classes.icon} aria-selected={selected}>
                <SelectIcon className={classes.check}  />
            </Icon>
        </IconButton>
    )

}

export default ModuleSelect;
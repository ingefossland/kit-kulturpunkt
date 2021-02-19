import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase'
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    actionLink: {
        width: "100%",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        "& .MuiTypography-root": {
            fontFamily: "Akkurat, sans-serif",
        },
        "&[role=group] + *": {
            borderTop: "1px solid",
            borderTopColor: theme.palette.divider,
            marginTop: theme.spacing(1.5),
            paddingTop: theme.spacing(1.5),
        },
        "& + &[role=group]": {
            borderTop: "1px solid",
            borderTopColor: theme.palette.divider,
            marginTop: theme.spacing(1.5),
            paddingTop: theme.spacing(1.5),

            "& + *": {
                borderTop: "1px solid",
                borderTopColor: theme.palette.divider,
                marginTop: theme.spacing(1.5),
                paddingTop: theme.spacing(1.5),
            }

        }

    },
    icon: {
        color: "rgba(0,0,0,.54)"
    },
    text: {
        fontFamily: "Akkurat, sans-serif !important",
        fontSize: "inherit",
        "& strong": {
            fontWeight: "bold"
        }
    }
}));

const ActionMenuLink = ({className, icon, label, title, description, onClick}) => {
    const classes = useStyles()

    if (!label && title) {
        label = title
    }

    if (!label) {
        return null
    }

    return (
        <MenuItem className={className || classes.actionLink} onClick={onClick}>
            { icon && <ListItemIcon><Icon className={classes.icon}>{icon}</Icon></ListItemIcon> }
            <ListItemText className={classes.text} primary={label} secondary={description}></ListItemText>
        </MenuItem>
    )

}

export default ActionMenuLink
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    buttongroup: {
        width: "100%",
        overflowX: "scroll",
        borderRadius: 0,

        "& > * + *": {
            marginLeft: theme.spacing(1),
        }
    },
    button: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "none",
        letterSpacing: 0,
        borderRadius: 1,
        minWidth: theme.spacing(12),
        minHeight: theme.spacing(7),
    },
    icon: {
        marginRight: theme.spacing(1),
        "& + $label": {
            marginRight: theme.spacing(1)
        }
    },
    label: {

    }
}));

const ModuleButtons = ({className, spacing = 1, buttons = []}) => {
    const classes = useStyles({spacing});

    if (!buttons.length) {
        return false
    }

    const ModuleButton = ({icon, title, color="primary", variant="outlined", size="large", ...props}) => {
    
        return (
            <Button {...props} type="button" data-size={size} data-variant={variant} disableElevation={true} color={color} variant={variant} size={size} className={classes.button}>
                { icon && <Icon className={classes.icon}>{icon}</Icon>}
                <b className={classes.label}>{title}</b>
            </Button>
        )
    
    }
    
    return (
        <ButtonGroup color="primary" className={className || classes.buttongroup}>
            { buttons && buttons.map((button, index) => {
                return (
                    <ModuleButton {...button} className={classes.button} key={index} />
                )
            })}
        </ButtonGroup>
    )

}

export default ModuleButtons;
import React from 'react';
import PropTypes from "prop-types"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttongroup: {
        margin: props => { return theme.spacing(props.spacing/2 * -1) },
        "& > *": {
            margin: props => { return theme.spacing(props.spacing/2) },
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

const SectionButtons = ({className, spacing = 1, buttons = []}) => {

    const classes = useStyles({spacing: 1})

    if (!buttons.length) {
        return null
    }

    const SectionButton = ({icon, title, color="primary", variant="outlined", size="large", ...props}) => {
        
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
                    <SectionButton {...button} key={index} />
                )
            })}
        </ButtonGroup>
    )
    
}

SectionButtons.defaultProps = {
    "spacing": 1
}

SectionButtons.propTypes = {
    buttons: PropTypes.array,
    buttonGroupProps: PropTypes.object,
    buttonProps: PropTypes.object
}

export default SectionButtons;
import React, { forwardRef } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SortIcon from '@material-ui/icons/SwapVert';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 2,
    },
    icon: {
        fontSize: 20,

        "& svg * ": {
            fill: "currentColor"
        }

    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 12,
        fontWeight: "bold",
        lineHeight: 1,
        textTransform: "uppercase",
    }
}));

const ListSettingsButton = forwardRef(({icon, label, children, onClick}, ref) => {

    const classes = useStyles()

    return (
        <ButtonBase onClick={onClick} ref={ref}>
            <SortIcon className={classes.icon} />
            <b className={classes.label}>{label}</b>
        </ButtonBase>
    )

    if (icon) {
        return (
            <IconButton onClick={onClick} ref={ref}>
                <Icon className={classes.icon}>{icon}</Icon>
            </IconButton>
        )
    }

    return (
        <IconButton className={classes.button} onClick={onClick} ref={ref}>
            <b className={classes.label}>{children}</b>
        </IconButton>
    )

})

ListSettingsButton.defaultProps = {
}

ListSettingsButton.propTypes = {
}

export default ListSettingsButton;
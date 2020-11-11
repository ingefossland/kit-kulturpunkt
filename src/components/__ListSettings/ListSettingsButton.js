import React, { forwardRef } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        padding: theme.spacing(1.5),
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 12,
        fontWeight: "bold",
        lineHeight: 1,
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: 2,
        padding: theme.spacing(.25, .5)

    }
}));

const ListSettingsButton = forwardRef(({children, onClick}, ref) => {

    const classes = useStyles()

    return (
        <ButtonBase className={classes.button} onClick={onClick} ref={ref}>
            <b className={classes.label}>{children}</b>
        </ButtonBase>
    )

})

ListSettingsButton.defaultProps = {
}

ListSettingsButton.propTypes = {
}

export default ListSettingsButton;
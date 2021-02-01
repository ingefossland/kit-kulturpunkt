import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "24px",
    },
    icon: {
    },
    label: {
    }
}));

const PathButton = ({style, icon, title, label, value, disabled, expanded, controls, onToggle, forwardedRef}) => {

    const classes = useStyles()

    return (
        <ButtonBase className={classes.root} style={style} ref={forwardedRef}
            disabled={disabled} 
            aria-controls={expanded ? controls : undefined}
            aria-expanded={expanded ? 'true' : undefined}
            aria-label="options"    
            aria-haspopup="menu"
            onClick={onToggle}>
                {label || title || value}
        </ButtonBase>
    )

}

export default PathButton
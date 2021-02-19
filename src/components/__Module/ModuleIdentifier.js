import React from 'react';
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    identifier: {
        fontFamily: "Akkurat mono, monospace",
        fontSize: props => { return props.fontSize },
        color: props => { return props.color || theme.palette.text.secondary },
    }
}));

const ModuleIdentifier = ({component = "h4", fontSize = 12, color, children}) => {
    const classes = useStyles({fontSize, color})

    return (
        <div className={classes.identifier}>{children}</div>
    )
}

ModuleIdentifier.propTypes = {
};

ModuleIdentifier.defaultProps = {
};

export default ModuleIdentifier;
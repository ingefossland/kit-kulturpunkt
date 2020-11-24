import React from 'react';
import PropTypes from "prop-types"

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: "100%",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: "normal",
        color: theme.palette.text.secondary
    }
}));

/** ModuleMetadata takes an array of strings and displays them on a single line */

const ModuleMetadata = ({className, metadata = []}) => {
    const classes = useStyles()

    if (!metadata) {
        return false
    }

    metadata = metadata.join(' – ')
    
    return (
        <Typography className={className || classes.root} noWrap={true} component="h3">{metadata}</Typography>
    )
}

ModuleMetadata.propTypes = {
    component: PropTypes.string,
    metadata: PropTypes.array,
}

export default ModuleMetadata;
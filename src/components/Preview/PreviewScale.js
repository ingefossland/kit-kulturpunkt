import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    scale: {
        position: "absolute",
        transform: props => { return props.scale && "scale("+props.scale+")" },
        margin: props => { return props.margin },
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        "& > *": {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,

            maxWidth: props => { return props.maxWidth },
            marginLeft: "auto",
            marginRight: "auto",
        }

    },
}));

const PreviewScale = ({children, maxWidth, scale = 1, margin = 0, ...props}) => {

    if (scale < 1) {
        margin = scale * 100 * -1 + "%"
    }

    const classes = useStyles({scale, maxWidth, margin})

    return (
        <div className={classes.scale}>
            {children}
        </div>
    )
}

PreviewScale.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PreviewScale;
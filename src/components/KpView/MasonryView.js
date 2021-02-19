import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import Masonry from "./Masonry"

const useStyles = makeStyles(theme => ({
    view: {
        display: "block",
        padding: props => { return theme.spacing(props.paddingY,props.paddingX) }
    },
}));

const MasonryView = ({colSize, cols = 3, padding = 0, paddingX = 2, paddingY, spacing = 2, header, footer, children, debug = false}) => {

    if (!paddingX) {
        paddingX = padding
    }

    if (!paddingY) {
        paddingY = padding
    }

    const classes = useStyles({padding, paddingX, paddingY, spacing})

    return (
        <div className={classes.view}>
            {header}
            <Masonry colSize={colSize} cols={cols} spacing={spacing}>
                {children}
            </Masonry>
            {footer}
        </div>        
    )

}

MasonryView.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    children: PropTypes.node 
}

export default MasonryView;
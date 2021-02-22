import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import Masonry from "./Masonry"

const useStyles = makeStyles(theme => ({
    view: {
        display: "block",
    },
}));

const MasonryView = ({colSize, cols = 3, spacing = 2, header, footer, children, debug = false}) => {

    const classes = useStyles()

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
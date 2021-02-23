import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import Masonry from "./Masonry"

const useStyles = makeStyles(theme => ({
    view: {
        display: "block",
    },
}));

const MasonryView = ({columnSize = 200, columns = 3, spacing = 2, header, footer, children, debug = false}) => {

    const classes = useStyles()

    return (
        <div className={classes.view}>
            {header}
            <Masonry columnSize={columnSize} columns={columns} spacing={spacing}>
                {children}
            </Masonry>
            {footer}
        </div>        
    )

}

MasonryView.propTypes = {
    columnSize: PropTypes.number,
    columns: PropTypes.number,
    spacing: PropTypes.number,
    header: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node 
}

export default MasonryView;
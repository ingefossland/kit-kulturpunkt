import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
       display: 'grid',
       gridTemplateColumns: 'repeat(auto-fit, minmax(192px, max-content))',
       gridGap: 0,
       padding: 'initial',
       justifyContent: 'center',
    },

}));

/** IconsView */

const IconsView = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.grid}>
            { children }
        </div>
    )    

}


IconsView.defaultProps = {
}

IconsView.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default IconsView;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewHeader, ViewPages } from ".."
import { makeStyles } from '@material-ui/core/styles';
import IconsModule from "./IconsModule"


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

const IconsView = ({
    items = undefined,
    children,
...props}) => {

    const classes = useStyles()

    return (
        <>
            <ViewHeader {...props} />
            <div className={classes.grid}>
                {items && items.map((item, index) => <IconsModule {...item} key={index} />) || children }
            </div>
            <ViewPages {...props} />
        </>
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

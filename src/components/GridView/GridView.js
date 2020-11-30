import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewHeader, ViewPages } from "../"
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

/** GridView */

const GridView = ({
    isLoading,
    loadingTitle,
    count,
    emptyTitle,
    children,
...props}) => {

    const classes = useStyles()

    if (isLoading && loadingTitle) {
        return <ViewHeader title={loadingTitle} />
    } else if (!count && emptyTitle) {
        return <ViewHeader title={emptyTitle} />
    }

    return (
        <>
            <ViewHeader {...props} />
            <div className={classes.grid}>
                {children}
            </div>
            <ViewPages {...props} />
        </>
    )    

}


GridView.defaultProps = {
    loadingTitle: "Loading ...",
    emptyTitle: "No hits ...",
}

GridView.propTypes = {
    isLoading: PropTypes.bool,
    loadingTitle: PropTypes.string,
    emptyTitle: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}

export default GridView;

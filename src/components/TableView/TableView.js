import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewHeader, ViewPages } from "../"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        display: "flex",
        flexDirection: "column",

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

    }

}));

/** TableView */

const TableView = ({
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
            <div className={classes.list}>
                {children}
            </div>
            <ViewPages {...props} />
        </>
    )    

}

TableView.defaultProps = {
    loadingTitle: "Loading ...",
    emptyTitle: "No hits ...",
}

TableView.propTypes = {
    isLoading: PropTypes.bool,
    loadingTitle: PropTypes.string,
    emptyTitle: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}


export default TableView;

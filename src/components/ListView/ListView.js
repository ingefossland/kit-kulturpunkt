import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewHeader, ViewPages } from "../"
import { makeStyles } from '@material-ui/core/styles';

import ListModule from "./ListModule"

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

/** ListView */

const ListView = ({
    items = undefined,
    children,
...props}) => {

    const classes = useStyles()

    return (
        <>
            <ViewHeader {...props} />
            <div className={classes.list}>
                {items && items.map((item, index) => <ListModule {...item} key={index} />) || children }
            </div>
            <ViewPages {...props} />
        </>
    )    

}

ListView.defaultProps = {
}

ListView.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}


export default ListView;

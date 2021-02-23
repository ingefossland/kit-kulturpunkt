import React from 'react';
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
    pages: {
        paddingTop: theme.spacing(1)
    }
}));

const ViewPages = ({className, pages = 0, page, onPage}) => {
    const classes = useStyles()

    if (pages < 2) {
        return false
    }

    const _onChange = (event, value) => {
        onPage && onPage(value, event)
    };
  
    return (
        <div className={className || classes.pages}>
            <Pagination count={pages} page={page} onChange={_onChange} />
        </div>
    );

    
}

ViewPages.defaultProps = {
}

ViewPages.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.number,
    page: PropTypes.number,
    onPage: PropTypes.func
}

export default ViewPages
import React from 'react';
import PropTypes from 'prop-types';
import NavSearch from "../NavSearch/NavSearch"
import NavSuggest from "../NavSuggest/NavSuggest"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
    },
    suggest: {
        position: "fixed",
        top: theme.spacing(8),
        width: "100%",
        boxShadow: theme.shadows[2]
    },
}));

const AppSearchDefault = ({className, suggestions, ...props}) => {

    const classes = useStyles()

    return (
        <>
        <NavSearch className={className} {...props} />
        {suggestions && <NavSuggest className={classes.suggest} suggestions={suggestions} />}
        </>
    )

}

AppSearchDefault.propTypes = {
    /** Placeholder */
    placeholder: PropTypes.string,
    /** Query */
    q: PropTypes.string,
    /** onChange */
    onChange: PropTypes.func,
    /** onToggle */
    onToggle: PropTypes.func,
    /** onReset */
    onReset: PropTypes.func
}

export default AppSearchDefault;
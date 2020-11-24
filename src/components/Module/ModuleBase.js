import React from 'react';
import PropTypes from "prop-types"
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        "&[data-status=trash]": {
            "& figure": {
                opacity: "0.5"
            },
        },
        "&.sortable-helper": {
            boxShadow: theme.shadows[12],
            zIndex: 2000
        }
    }
}));

/** ModuleBase is used as a wrapper for all modules, setting common variables that other modules need.  */

const ModuleBase = ({
        id, 
        className,
        component,
        status, 
        selected,
        expanded, 
        elevation, 
        onClick, 
        children
    }) => {

    const classes = useStyles();

    if (component === "tr") {
        return (
            <tr id={id}
                className={className || classes.root}
                data-status={status}
                aria-expanded={expanded}
                aria-selected={selected}>
                    {children}
            </tr>
        )
    }

    if (!elevation) {
        return (
            <article id={id}
                className={className || classes.root}
                data-status={status}
                aria-expanded={expanded}
                aria-selected={selected}
                role={onClick && "button"}
                onClick={onClick}>
                    {children}
            </article>
        )
    }


    return (
        <Paper id={id} 
            component={component}
            className={className || classes.root}
            data-status={status}
            data-elevated={true}
            aria-expanded={expanded}
            aria-selected={selected}
            elevation={elevation}
            square={true}
            role={onClick && "button"}
            onClick={onClick}>
                { children }
        </Paper>
    )

}

ModuleBase.defaultProps = {
    component: "article",
    elevation: 0,


}

ModuleBase.propTypes = {
    /** Id */
    id: PropTypes.string,
    /** className */
    className: PropTypes.string,
    /** Which component to use */
    component: PropTypes.string,
    /** Elevation */
    elevation: PropTypes.number,
    /** Status */
    status: PropTypes.string,
    /** Selected or not */
    selected: PropTypes.bool,
    /** Expanded or not */
    expanded: PropTypes.bool,
    /** onClick */
    onClick: PropTypes.func
}

export default ModuleBase;
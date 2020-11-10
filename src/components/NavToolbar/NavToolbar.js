import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types"

import NavToolbarOptions from "./NavToolbarOptions"
import NavToolbarSettings from "./NavToolbarSettings"
import NavToolbarButton from "./NavToolbarButton"

import getToolbar from "./getToolbar"

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap"
    }
}));

/** NavToolbar renders buttons and options based on capabilities. */

const NavToolbar = ({className, toolbar, ...props}) => {
    const classes = useStyles()

    if (!toolbar) {
        toolbar = getToolbar(props)
    }

    if (!toolbar.length) {
        return false
    }

    return (
        <div className={className || classes.toolbar}>
            { toolbar && toolbar.map((button, index) => {

                const { value, options } = button

                if (value) {
                    return <NavToolbarSettings {...button} />
                }

                if (options) {
                    return <NavToolbarOptions {...button} />
                }
            
                return <NavToolbarButton {...button} />
                
            })}
        </div>
    )

}

NavToolbar.propTypes = {
    toolbar: PropTypes.array,
    hideable: PropTypes.bool,
    hidden: PropTypes.bool,
    onHide: PropTypes.func,
    onUnhide: PropTypes.func,
    editable: PropTypes.bool,
    editing: PropTypes.bool,
    onEdit: PropTypes.func,
    deletable: PropTypes.bool,
    deleted: PropTypes.bool,
    onDelete: PropTypes.func,
    erasable: PropTypes.bool,
    erased: PropTypes.bool,
    onErase: PropTypes.func,
    restorable: PropTypes.bool,
    restored: PropTypes.bool,
    onRestore: PropTypes.func,
    removable: PropTypes.bool,
    removed: PropTypes.bool,
    onRemove: PropTypes.func,
}

export default NavToolbar;

import React, { useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import NavActionButton from "./NavActionButton"
import NavActionDropdown from "./NavActionDropdown"
import NavActionMenu from "./NavActionMenu"

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: "14px",
    }
}));

const NavAction = ({className, icons = {}, variant="contained", color="primary", placement = "bottom-start", primaryAction, menu = [], onSelect}) => {
    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null);
    const classes = useStyles()
   
    const handleToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const handleSelect = ({onClick, ...item}) => {
        onClick && onClick() || onSelect && onSelect(item)
        setExpanded(false);
    }

    if (!primaryAction && menu.length) {
        primaryAction = menu[0]
    }

    if (primaryAction && primaryAction.children) {
        const menu = primaryAction.children
        const role = primaryAction.role

        if (role !== "button") {
            return (
                <nav className={className || classes.root}>
                    <NavActionButton {...primaryAction} variant={primaryAction.variant || variant} color={color} expanded={expanded} forwardedRef={anchorRef} onToggle={handleToggle} />
                    <NavActionDropdown open={expanded} anchorEl={anchorRef.current} placement={placement} onClickAway={handleToggle}>
                        <NavActionMenu menu={menu} onSelect={handleSelect} />
                    </NavActionDropdown>
                </nav>
            )
        }

        return (
            <nav className={className || classes.root}>
                <NavActionButton {...primaryAction} variant={primaryAction.variant || variant} color={color} expanded={expanded} forwardedRef={anchorRef} onClick={() => handleSelect(primaryAction)} onToggle={handleToggle} />
                <NavActionDropdown open={expanded} anchorEl={anchorRef.current} placement={placement} onClickAway={handleToggle}>
                    <NavActionMenu menu={menu} onSelect={handleSelect} />
                </NavActionDropdown>
            </nav>
        )
        
    }

    if (primaryAction) {
        return (
            <nav className={className || classes.root}>
                <NavActionButton {...primaryAction} variant={primaryAction.variant || variant} color={color} onClick={() => handleSelect(primaryAction)} />
            </nav>
        )
    }

    return null

}


NavAction.defaultProps = {
    menu: [],
    menuByUrl: {}
}

NavAction.propTypes = {
    /** ClassName */
    className: PropTypes.string,
    /** Custom icons */
    icons: PropTypes.object,
    /** The menu array */
    menu: PropTypes.array,
    /** Menu items, indexed by url */
    menuByUrl: PropTypes.object,
    /** Current URL selected */
    currentUrl: PropTypes.string,
    /** Select function */
    onSelect: PropTypes.func,
}

export default NavAction;
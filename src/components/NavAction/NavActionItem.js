import React, { useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import NavActionButton from "./NavActionButton"
import NavActionDropdown from "./NavActionDropdown"
import NavActionMenu from "./NavActionMenu"

const NavActionItem = ({variant = "contained", icons = {}, menuByUrl = {}, onSelect, ...props}) => {

    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null);

    const { url, children, onClick } = props

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onSelect = (item) => {
        onSelect && onSelect(item)
        setExpanded(false);
    }

    // combo

    if (children && url || children && onClick) {

        return (
            <>
                <NavActionButton {...props} variant={variant} onClick={() => _onSelect(props)} forwardedRef={anchorRef} onToggle={_onToggle} />
                <NavActionDropdown open={expanded} anchorEl={anchorRef.current} onClickAway={_onToggle}>
                    <NavActionMenu icons={icons} menu={children} menuByUrl={menuByUrl} onSelect={_onSelect} />
                </NavActionDropdown>
            </>
        )

    }

    // children

    if (children) {

        return (
            <>
                <NavActionButton {...props} variant={variant} expanded={expanded} forwardedRef={anchorRef} onToggle={_onToggle} />
                <NavActionDropdown open={expanded} anchorEl={anchorRef.current} onClickAway={_onToggle}>
                    <NavActionMenu icons={icons} menu={children} menuByUrl={menuByUrl} onSelect={_onSelect} />
                </NavActionDropdown>
            </>
        )
        
    }

    // single

    return (
        <NavActionButton {...props} variant={variant} onClick={() => _onSelect(props)} />
    )

    return null

}


NavActionItem.defaultProps = {
    menu: [],
    menuByUrl: {}
}

NavActionItem.propTypes = {
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

export default NavActionItem;
import React from 'react';
import PropTypes from 'prop-types';

import NavActionButtongroup from "./NavActionButtongroup"
import NavActionItem from "./NavActionItem"

/** Action menu component */

const NavAction = ({className, icons = {}, menu = [], menuByUrl, onSelect, onToggle}) => {

    const _onSelect = (item, event) => {
        item.onClick && item.onClick() || onSelect && onSelect(item)
    }

    const _onToggle = (item, event) => {
        onToggle && onToggle(item)
    }

    const renderItem = (item, index) => {

        if (item.url && menuByUrl && menuByUrl[item.url]) {
            item = {
                ...menuByUrl[item.url],
                ...item,
            }
        }

        if (item.icon && icons[item.icon]) {
            item = {
                ...item,
                icon: icons[item.icon]
            }
        }

        return (
            <NavActionItem {...item} icons={icons} menuByUrl={menuByUrl} key={index} onSelect={_onSelect} />
        )

    }

    if (!menu || !menu.length) {
        return false
    }

    return (
        <NavActionButtongroup variant="contained" className={className}>
            { menu.map(renderItem)}
        </NavActionButtongroup>
    )

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
    /** Toggle function */
    onToggle: PropTypes.func
}

export default NavAction;
import React from 'react';
import PropTypes from 'prop-types';
import MenuList from "./NavActionMenuList"
import MenuItem from "./NavActionMenuItem"
import MenuLink from "./NavActionMenuLink"

/** Menu component. Takes */

const NavMenu = ({className, icons = {}, menu = [], menuByUrl, onSelect, onToggle}) => {

    const _onSelect = (item) => {
        onSelect && onSelect(item)
    }

    const _onToggle = (item, event) => {
        onToggle && onToggle(item)
    }

    const renderLink = (item) => {
        const { selected, url, icon, title, label, count, onClick } = item;

        return (
            <MenuLink selected={selected} url={url} icon={icon} label={label || title} count={count} onClick={() => _onSelect(item)} />
        )

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

        const { role, children, hidden, selected } = item;

        const expanded = true

        if (hidden) {
            return (
                <MenuItem key={index} role={role}>
                    <MenuList role={role}>
                    { children && children.map(renderItem)}
                    </MenuList>
                </MenuItem>
            )
        }

        if (children) {
            return (
                <MenuItem key={index} role={role || "treeitem"} selected={selected} expanded={expanded} onToggle={(event) => _onToggle(item, event)}>
                    { renderLink(item) }
                    { children && expanded && 
                        <MenuList role="tree">
                        { children && children.map(renderItem)}
                        </MenuList>
                    }
                </MenuItem>
            )
        }

        return (
            <MenuItem {...item} key={index} role={role || "none"}>
                { renderLink(item) }
            </MenuItem>
        )

    }

    if (!menu || !menu.length) {
        return false
    }

    return (
        <nav className={className}>
            <MenuList role="tree">
                { menu.map(renderItem)}
            </MenuList>
        </nav>
    )

}

NavMenu.defaultProps = {
    menu: [],
    menuByUrl: {}
}

NavMenu.propTypes = {
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

export default NavMenu;
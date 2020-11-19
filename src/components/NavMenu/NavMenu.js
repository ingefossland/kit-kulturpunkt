import React from 'react';
import PropTypes from 'prop-types';
import NavMenuList from "./NavMenuList"
import NavMenuItem from "./NavMenuItem"
import NavMenuLink from "./NavMenuLink"

const NavMenuCalendar = () => { return <p>cal</p>}

/** Menu component. Takes */

const NavMenu = ({className, menu = [], menuByUrl, currentUrl, onSelect, onToggle}) => {

    const _onSelect = (item, event) => {
        onSelect && onSelect(item)
    }

    const _onToggle = (item, event) => {
        onToggle && onToggle(item)
    }

    const renderLink = (item) => {
        const { selected, url, icon, title, label, count } = item;

        return (
            <NavMenuLink selected={selected} url={url} icon={icon} label={label || title} count={count} onClick={(event) => _onSelect(item, event)} />
        )

    }

    const renderItem = (item, index) => {

        if (item.url && menuByUrl && menuByUrl[item.url]) {
            item = {
                ...item,
                ...menuByUrl[item.url],
            }
        }

        if (item.url && currentUrl && item.url === currentUrl) {
            item = {
                ...item,
                expanded: true,
                selected: true
            }
        }

        if (item.url && currentUrl && currentUrl.startsWith(item.url)) {
            item = {
                ...item,
                expanded: true,
            }
        }

        const { role, calendar, children, hidden, selected, expanded } = item;

        if (hidden) {
            return (
                <NavMenuItem key={index} role={role}>
                    <NavMenuList role={role}>
                    { children && children.map(renderItem)}
                    </NavMenuList>
                </NavMenuItem>
            )
        }

        if (calendar) {
            return (
                <NavMenuItem key={index} role={role || "treeitem"} selected={selected} expanded={expanded} onToggle={(event) => _onToggle(item, event)}>
                    { renderLink(item) }
                    { expanded &&
                        <NavMenuCalendar {...calendar} /> 
                    }
                </NavMenuItem>
            )

        }

        if (children && children.length) {
            return (
                <NavMenuItem key={index} role={role || "treeitem"} selected={selected} expanded={expanded} onToggle={(event) => _onToggle(item, event)}>
                    { renderLink(item) }
                    { children && expanded && 
                        <NavMenuList role="tree">
                        { children && children.map(renderItem)}
                        </NavMenuList>
                    }
                </NavMenuItem>
            )
        }

        return (
            <NavMenuItem {...item} key={index} role={role || "none"}>
                { renderLink(item) }
            </NavMenuItem>
        )

    }

    if (!menu || !menu.length) {
        return false
    }

    return (
        <nav className={className}>
            <NavMenuList role="tree">
                { menu.map(renderItem)}
            </NavMenuList>
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
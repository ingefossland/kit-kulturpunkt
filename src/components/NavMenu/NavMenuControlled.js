import React, { useState } from 'react';
import NavMenu from "./NavMenu"

const NavMenuControlled = ({menu = [], onSelect, onToggle, ...props}) => {

    const [currentUrl, setCurrentUrl] = useState(props.currentUrl || undefined)
    const [menuByUrl, setMenuByUrl] = useState(props.menuByUrl || {})

    const handleSelect = (item, event) => {
        const { url } = item;

        url && setCurrentUrl(url)

        onSelect && onSelect(item, event)
    }

    const handleToggle = (item, event) => {
        const itemByUrl = menuByUrl && item.url && menuByUrl[item.url] 

        const uniqueItem = {
            ...item,
            ...itemByUrl,
            selected: false
        }

        const { url, expanded } = uniqueItem;

        url && setMenuByUrl({
            ...menuByUrl,
            [url]: {
                ...uniqueItem,
                expanded: !expanded
            }
        })

        onToggle && onToggle(item, event)
    }

    return (
        <NavMenu 
            menu={menu} 
            menuByUrl={menuByUrl} 
            currentUrl={currentUrl}
            onToggle={handleToggle}
            onSelect={handleSelect} />
    )

}

export default NavMenuControlled;
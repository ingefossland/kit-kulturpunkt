import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Path from "./Path"
import PathFilters from "./PathFilters"

import PathItem from "./PathItem"

const NavPath = ({className, parents, filters, title, onSelect, children }) => {

    const handleSelect = (item) => {
        item.onClick && item.onClick()
        onSelect && onSelect(item)
    }

    return (
        <Path className={className}>
            {parents && parents.map((parent, index) => (
                <PathItem {...parent} onClick={() => handleSelect(parent)} key={index}>{parent.label || parent.title}</PathItem>
            ))}
            {filters && <PathFilters filters={filters} onSelect={handleSelect} />}
            {title && <PathItem>{title}</PathItem>}
            {children}
        </Path>
    )

}

export default NavPath;
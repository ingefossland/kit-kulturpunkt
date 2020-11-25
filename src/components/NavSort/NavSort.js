import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types"
import { Dropdown } from "@kit-ui/core"

import SortOptionsButton from './SortOptionsButton';
import SortOptions from "./SortOptionsList"

const NavSort = ({
    className,
    value, 
    options,
    onChange,
}) => {

    const { t, i18n } = useTranslation(['sort'])

    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null)

    const _onChange = (value) => {
        onChange && onChange(value)
        setExpanded(false)
    }

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    const sortOptions = options && options.map(option => {
        
        if (typeof option === "string" || typeof option === "number") {
            return {
                label: t(option),
                value: option.toString()
            }
        }

        return option

    })

    if (!sortOptions) {
        return false
    }

    if (!value && sortOptions.length) {
        value = sortOptions[0].value
    }

    const currentOption = value && sortOptions.find(option => option.value === value) || sortOptions[0]


    return (
        <nav className={className}>
            <SortOptionsButton onClick={_onToggle} {...currentOption} ref={anchorRef}>{currentOption && currentOption.label}</SortOptionsButton>
            <Dropdown expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                <SortOptions options={sortOptions} value={value} onChange={_onChange} />
            </Dropdown>
        </nav>
    )

}

NavSort.defaultProps = {
}

NavSort.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default NavSort
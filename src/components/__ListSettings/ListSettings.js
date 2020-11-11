import React, { useState, useRef } from 'react';
import PropTypes from "prop-types"
import { Dropdown } from "@kit-ui/core"

import ListSettingsButton from './ListSettingsButton';
import ListSettingsOptions from "./ListSettingsOptions"

const ListSettings = ({
    value, 
    options,
    onChange,
}) => {

    if (!value) {
        value = options[0].value
    }

    let label

    options.map((option => {
        if (option.value === value) {
            label = option.label
        }
    }))    

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

    return (
        <React.Fragment>
            <ListSettingsButton onClick={_onToggle} ref={anchorRef}>{label || value}</ListSettingsButton>
            <Dropdown expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                <ListSettingsOptions options={options} value={value} onChange={_onChange} />
            </Dropdown>
        </React.Fragment>
    )

}

ListSettings.defaultProps = {
}

ListSettings.propTypes = {
}

export default ListSettings;
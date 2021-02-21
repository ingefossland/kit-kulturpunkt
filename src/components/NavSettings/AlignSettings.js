import React, { forwardRef, useState, useEffect, useRef } from 'react';
import SettingsButton from "./SettingsButton"
import SettingsDropdown from "./SettingsDropdown"
import _ from "lodash"

import SettingsList from "./SettingsList"

const defaultOptions = [
    "left", "center", "right"
]

const defaultProps = {
    "left": {
        "order": 1,
        "icon": "format_align_left"
    },
    "center": {
        "order": 2,
        "icon": "format_align_center"
    },
    "right": {
        "order": 3,
        "icon": "format_align_right"
    }
}

const getOptions = ({options = []}) => {
    let  _options = [], _byValue = {};

    if (!options.length) {
        options = defaultOptions
    }

    options.map((item, index) => {

        if (typeof item === "string") {
            item = { label: item, value: item }
        }

        const itemProps = defaultProps[item.value];

        item = {
            ...item,
            ...itemProps
        }

        _options.push(item)
        _byValue[item.value] = item

    })    

    _options = _.orderBy(_options, 'order', 'asc'); 

    return {
        byValue: _byValue,
        options: _options,
    }

}

const SettingsButtonRef = forwardRef((props, ref) => {
    return <SettingsButton {...props} forwardedRef={ref} />;
});

const AlignSettings = ({type = "grid", name, label, value, onChange, ...props}) => {
    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null);

    const { options, byValue } = getOptions(props)
    const current = byValue[value] || options[0]

    const onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const onSelect = (item) => {
        if (onChange) {
            onChange(name, item.value)
        }
        setExpanded(false);
    }

    const onCollapse = () => {
        setExpanded(false);
    };

    return (
        <React.Fragment>
            <SettingsButtonRef {...current} type={type} onToggle={onToggle} expanded={expanded} ref={anchorRef} />
            <SettingsDropdown expanded={expanded} anchorEl={anchorRef.current} onCollapse={onCollapse}>
                <SettingsList value={value} options={options} onSelect={onSelect} />
            </SettingsDropdown>
        </React.Fragment>            
    )

}

export default AlignSettings;
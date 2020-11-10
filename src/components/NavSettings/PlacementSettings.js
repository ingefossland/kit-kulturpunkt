import React, { forwardRef, useState, useEffect, useRef } from 'react';
import SettingsButton from "./SettingsButton"
import SettingsDropdown from "./SettingsDropdown"
import _ from "lodash"

import SettingsList from "./SettingsList"

import { 
    PlacementTop,
    PlacementTopLeft,
    PlacementTopRight,
    PlacementLeft,
    PlacementCenter,
    PlacementRight,
    PlacementBottom,
    PlacementBottomLeft,
    PlacementBottomRight
} from '../Icons/placement';


const defaultOptions = [
    "top-left", "center", "bottom-left"
]

const defaultProps = {
    "top-left": {
        "order": "1a",
        "icon": <PlacementTopLeft />
    },
    "top": {
        "order": "1b",
        "icon": <PlacementTop />
    },
    "top-right": {
        "order": "1c",
        "icon": <PlacementTopRight />
    },
    "left": {
        "order": "2a",
        "icon": <PlacementLeft />
    },
    "center": {
        "order": "2b",
        "icon": <PlacementCenter />
    },
    "right": {
        "order": "2c",
        "icon": <PlacementRight />
    },
    "bottom-left": {
        "order": "3a",
        "icon": <PlacementBottomLeft />
    },
    "bottom": {
        "order": "3b",
        "icon": <PlacementBottom />
    },
    "bottom-right": {
        "order": "3c",
        "icon": <PlacementBottomRight />
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

    _options = _.orderBy(_options, 'order', 'desc'); 

    return {
        byValue: _byValue,
        options: _options,
    }

}

const SettingsButtonRef = forwardRef((props, ref) => {
    return <SettingsButton {...props} forwardedRef={ref} />;
});

const ValignSettings = ({type = "grid", name, label, value, onChange, ...props}) => {
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

export default ValignSettings;
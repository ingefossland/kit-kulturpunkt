import React, { forwardRef, useState, useEffect, useRef } from 'react';
import SettingsButton from "./SettingsButton"
import SettingsDropdown from "./SettingsDropdown"
import _ from "lodash"

import GridSettingsList from "./GridSettingsList"

const sizes = {
    "xlarge": "4:4",
    "xl": "4:4",
    "large": "4:3",
    "l": "4:3",
    "l-m": "4:2",
    "m-l": "2:4",
    "medium": "2:2",
    "m": "2:2",
    "m-s": "2:1",
    "s-m": "1:2",
    "small": "1:1",
    "s": "1:1",
    "xsmall": "0.5:0.5",
    "xs": "0.5:0.5",
}

const getOptions = ({options = []}) => {
    let _cols = 0, _rows = 0, _options = [], _byValue = {};

    options.map((item, index) => {

        if (typeof item === "string") {
            item = { label: item, value: item }
        }

        const size = sizes[item.value];
        const grid = size.split(':')
        const cols = grid[0] * 1
        const rows = grid[1] * 1

        if (cols > _cols) {
            _cols = cols
        }

        if (rows > _rows) {
            _rows = rows
        }

        item = {
            ...item,
            order: cols * rows,
            size: size,
            cols: cols,
            rows: rows
        }

        _options.push(item)
        _byValue[item.value] = item

    })    

    _options = _.orderBy(_options, 'order', 'desc'); 

    return {
        byValue: _byValue,
        options: _options,
        cols: _cols,
        rows: _rows,
    }

}

const SettingsButtonRef = forwardRef((props, ref) => {
    return <SettingsButton {...props} forwardedRef={ref} />;
});

const SettingsSize = ({type = "grid", name, label, value, onChange, ...props}) => {
    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null);

    const { options, byValue, cols, rows } = getOptions(props)
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
                <GridSettingsList value={value} cols={cols} rows={rows} options={options} onSelect={onSelect} />
            </SettingsDropdown>
        </React.Fragment>            
    )

}

export default SettingsSize;
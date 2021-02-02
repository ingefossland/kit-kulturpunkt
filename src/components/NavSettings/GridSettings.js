import React, { useState, useRef } from 'react';
import { Dropdown } from "@kit-ui/core"
import Button from '@material-ui/core/Button';
import _ from "lodash"

import GridSettingsList from "./GridSettingsList"

const getOptions = ({options = []}) => {
    let _cols = 0, _rows = 0, _options = [], _byValue = {};

    options.map((item, index) => {

        if (typeof item === "string") {
            item = { label: item, value: item }
        }

        const size = item.value;
        const grid = size.split(':');
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


const GridSettings = ({type = "grid", name, label, value, onChange, ...props}) => {
    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null)

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    
    const { options, byValue, cols, rows } = getOptions(props)
    const current = byValue[value] || options[0]


    const onSelect = (item) => {
        if (onChange) {
            onChange(name, item.value)
        }
        setExpanded(false);
    }

    const onCollapse = () => {
        setExpanded(false);
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={_onToggle} ref={anchorRef}>{current.label}</Button>
            <Dropdown expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                <GridSettingsList value={current && current.value} cols={cols} rows={rows} options={options} onSelect={onSelect} />
            </Dropdown>
        </React.Fragment>            
    )

}

export default GridSettings;
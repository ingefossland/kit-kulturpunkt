import React from 'react';
import _ from "lodash"

import SettingsButton from "./PathButton"
import SettingsDropdown from "./PathDropdown"
import SettingsList from "./PathFiltersList"

const getOptions = ({filters = []}) => {

    let _options = [], _byValue = {};

    filters.map((item, index) => {

        if (typeof item === "string") {
            item = { label: item, value: item }
        }

        _options.push(item)
        _byValue[item.value] = item

    })

    return {
        options: _options,
        byValue: _byValue
    }

}

const SettingsButtonRef = React.forwardRef((props, ref) => {
    return <SettingsButton {...props} forwardedRef={ref} />;
});

const SettingsOptions = ({name, label, type = "options", onSelect, children, ...props}) => {
    const [value, setValue] = React.useState(props.value);
    const [expanded, setExpanded] = React.useState(false);
    const anchorRef = React.useRef(null);
    const { options, byValue } = getOptions(props)
    const current = byValue[value] || options[0]

    const handleToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const handleSelect = (item) => {
        onSelect && onSelect(item)
        setValue(item.value);
        setExpanded(false);
    }

    const handleCollapse = () => {
        setExpanded(false);
    };

    return (
        <React.Fragment>
            <SettingsButtonRef {...current} value={value} type={type} onToggle={handleToggle} expanded={expanded} ref={anchorRef} />
            <SettingsDropdown expanded={expanded} anchorEl={anchorRef.current} onCollapse={handleCollapse}>
                <SettingsList value={current && current.value} options={options} onSelect={handleSelect} />
            </SettingsDropdown>
        </React.Fragment>
    )
        
}

export default SettingsOptions
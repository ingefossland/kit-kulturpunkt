import React, { useState, useRef } from 'react';
import PropTypes from "prop-types"
import { Dropdown } from "@kit-ui/core"

import Link from '@material-ui/core/Link';
import ViewOptionsList from "./ViewOptionsList"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    link: {
        "fontStyle": "normal",
        "&:hover": {
            "cursor": "pointer"
        }
    }
}));

const ViewOptions = ({
    className,
    value, 
    options,
    onChange,
}) => {

    const classes = useStyles()

    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null)

    const _onChange = (value) => {
        console.log('change', value)

        onChange && onChange(value)
        setExpanded(false)
    }

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    if (!options) {
        return false
    }

    if (!value && options.length) {
        value = options[0].value
    }

    const currentOption = value && options.find(option => option.value === value) || options[0]

    const label = currentOption && currentOption.label || currentOption && currentOption.title 

    return (
        <>
            <Link className={className || classes.link } onClick={_onToggle} ref={anchorRef}>
                <b className={classes.label}>{label}</b>
            </Link>
            <Dropdown expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                <ViewOptionsList options={options} value={value} onChange={_onChange} />
            </Dropdown>
        </>
    )

}

ViewOptions.defaultProps = {
}

ViewOptions.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default ViewOptions
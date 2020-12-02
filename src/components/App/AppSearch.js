import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import AppSearchDefault from "./AppSearchDefault"
import AppSearchGrowing from "./AppSearchGrowing"

const variants = {
    "default": AppSearchDefault,
    "growing": AppSearchGrowing
}


const AppSearch = ({className, variant = "default", ...props}) => {

    const Template = variants && variants[variant]

    return (
        <Template
            className={className}
            variant={variant}
            {...props}
            />
    )
}

AppSearch.defaultProps = {
    expanded: true,
    placeholder: "Search"
}

AppSearch.propTypes = {
    /** Expanded */
    expanded: PropTypes.bool,
    /** Placeholder */
    placeholder: PropTypes.string,
    /** Query */
    q: PropTypes.string,
    /** onChange */
    onChange: PropTypes.func,
    /** onToggle */
    onToggle: PropTypes.func,
    /** onReset */
    onReset: PropTypes.func
}

export default AppSearch;
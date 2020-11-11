import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types"
import ListSettings from "./ListSettings"
import { utils } from "@rjsf/core";
const { getUiOptions } = utils

const ListSettingsWidget = ({
    uiSchema,
    value, 
    options,
    onChange
}) => {

    const uiOptions = getUiOptions(uiSchema)

    const enumOptions = options.enumOptions.map(option => {

        const icon = uiOptions.enumIcons && uiOptions.enumIcons[option.value]

        return {
            ...option,
            icon: icon
        }
    })

    return (
        <ListSettings {...options} options={enumOptions} value={value} onChange={onChange} />
    )

}

ListSettingsWidget.defaultProps = {
}

ListSettingsWidget.propTypes = {
}

export default ListSettingsWidget;
import React, { useState, useEffect } from "react"
import LicenseFieldAutocomplete from "./LicenseFieldAutocomplete"
import data from "./LicenseField.data"

import _ from "lodash"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils



const LicenseField = (props) => {

    const { idSchema, schema, uiSchema, formData = {}, onChange } = props

    const id = idSchema.$id

    // options

    const options = data

    // query

    const uiOptions = getUiOptions(uiSchema)

    const _onInputChange = (event) => {
        const q = event && event.target.value;
//        _onQuery(q)
    }

    const _onChange = (option) => {

        console.log('option', option)

       option && onChange({
           ...option
       })
    }

    // label, helperText, variant

    const label = uiOptions.title || "License"
    const helperText = uiOptions.help
    const variant = uiOptions.variant

    const endAdornment = uiOptions.endAdornment

    const { LayoutField } = props.registry.fields


    return (
        <LayoutField {...props}>
            <LicenseFieldAutocomplete
                id={id}
                label={label}
                helperText={helperText}
                variant={variant}
                options={options}
                formData={formData}
                value={formData}
                onChange={_onChange}
                onInputChange={_onInputChange}
                endAdornment={endAdornment}
            />
        </LayoutField>
    )


}

LicenseField.defaultProps = {
    formData: {
        
    }
}

export default LicenseField
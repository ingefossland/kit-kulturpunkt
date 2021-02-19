import React, { useRef } from "react"
import ColorTagsAutocomplete from "./ColorTagsAutocomplete"
import colorNames from "./Color.names"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const ColorTagsField = (props) => {

    const { formData, formContext, uiSchema } = props

    const options = Object.keys(colorNames).map(name => {

        const hex = colorNames[name]

        return {
            label: name,
            value: colorNames[name],
            hex: hex
        }

    })

    const uiOptions = getUiOptions(uiSchema)

    const title = uiOptions.title
    const placeholder = "Legg til farge"
    const helperText = uiOptions.help

    return (
        <ColorTagsAutocomplete {...props}
            imageUrl={formContext.imageUrl}
            options={options}
            label={title}
            placeholder={placeholder}
            helperText={helperText}
            value={formData}
        />
    )

}

ColorTagsField.defaultProps = {
    formData: [
        
    ]
}

export default ColorTagsField
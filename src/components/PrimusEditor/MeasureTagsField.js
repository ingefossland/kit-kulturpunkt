import React from "react"
import MeasureTagsAutocompleteField from "./MeasureTagsAutocompleteField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils



const MeasureTagsField = (props) => {

    const { formData, uiSchema } = props

    const uiOptions = getUiOptions(uiSchema)

    const title = uiOptions.title
    const placeholder = "Legg til mål"

    return (
        <MeasureTagsAutocompleteField {...props}
            options={[]}
            label={title}
            placeholder={placeholder}
            value={formData}
         />
    )

}

MeasureTagsField.defaultProps = {
    formData: [
        
    ]
}

export default MeasureTagsField
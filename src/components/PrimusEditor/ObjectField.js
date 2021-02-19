import React, { useState, useEffect } from "react"
import ObjectSearchField from "./ObjectSearchField"
import PersonRoleField from "./PersonRoleField"
import PersonStatusField from "./PersonStatusField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const PersonField = (props) => {

    const { LayoutField } = props.registry.fields

    const uiSchema = {
        ...props.uiSchema,
    }

    /*
    const EndAdornment = () => {

        return (
            <>
                <PersonStatusField {...props} />
                <PersonRoleField {...props} />
            </>
        )
        
    }

    */
    return (
        <LayoutField {...props} uiSchema={uiSchema}>
            <ObjectSearchField {...props} endAdornment={undefined} />
        </LayoutField>
    )

}

PersonField.defaultProps = {
    formData: {
        
    }
}

export default PersonField
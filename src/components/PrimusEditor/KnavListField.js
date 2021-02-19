import React, { useState, useEffect } from "react"
import _ from "lodash"

import PrimusListArrayField from "./KnavListArrayField"
import KnavListSearchField from "./KnavListSearchField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils


const PrimusListField = (props) => {

    const { LayoutField } = props.registry.fields

    const uiSchema = {
        ...props.uiSchema,
        "ui:spacing": 2
    }

    return (
        <LayoutField {...props} uiSchema={uiSchema}>
            <PrimusListArrayField {...props} />
            <KnavListSearchField {...props} />
        </LayoutField>
    )

}

PrimusListField.defaultProps = {
    formData: {
        
    }
}

export default PrimusListField
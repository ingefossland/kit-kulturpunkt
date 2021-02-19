import React, { useState, useEffect } from "react"
import KnavSearchField from "./KnavSearchField"
import KnavTagsField from "./KnavTagsField"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const ClassificationField = (props) => {

    const locale = "no"

    const _getOutlineId = (text) => {
        return text.match(/\(([^)]+)\)/)[1]
    }

    const _getOption = (item) => {

        const name = item.name && item.name[locale]
        const caption = item.caption && item.caption[locale]
        const uuid = item.uuid

        const id = caption && _getOutlineId(caption)

        let parent

        if (item.partOf && item.partOf.displayValue && item.partOf.displayValue[locale]) {
            parent = item.partOf.displayValue[locale]
        }

        const parentId = parent && _getOutlineId(parent)

        const description = "Outline " + id

        const label = name
        const value = name

        return {
            uuid: uuid,
            value: value,
            label: label,
            description: description,
            system: "Outline",
            systemId: id,
        }        


    }

    const EndAdornment = () => {

        const { system, systemId } = props.formData 

        if (system && systemId) {
            return (
                <div>
                    {system} {systemId}
                </div>
            )
        }

        return false
        
    }

    const uiSchema = {
        "ui:title": "Klassifikasjon",
        "ui:endAdornment": <EndAdornment />,
        "ui:locale": locale,
        "ui:getOption": _getOption,
        "ui:query": {
            "entity.dataset": "a8797483-ff02-4a4c-adf1-b406cbcd6fc2"
        },
//        ...props.uiSchema,
    }

    return (
        <KnavSearchField {...props} uiSchema={uiSchema} />
    )

}

ClassificationField.defaultProps = {
    formData: {
        
    }
}

export default ClassificationField
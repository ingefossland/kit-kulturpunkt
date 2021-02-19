import React, { useState, useEffect } from "react"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState, toIdSchema } = utils

const MediaArrayTemplate = (props) => {

    const { LayoutField } = props.registry.fields

    const renderItem = (item, index) => {
        const { hasToolbar, hasMoveUp, hasMoveDown, hasRemove } = item
        const { onAddIndexClick, onDropIndexClick, onReorderClick } = item
        const itemUiSchema = item.children.props && item.children.props.uiSchema || {}

        const uiSchema = {
            ...itemUiSchema,
            "ui:removable": hasRemove,
        }
        const itemProps = {
            ...item.children.props,
            formContext: props.formContext, 
            hasToolbar: hasToolbar,
            hasMoveUp: hasMoveUp,
            hasMoveDown: hasMoveDown,
            hasRemove: hasRemove,
            onAddIndexClick: onAddIndexClick,
            onDropIndexClick: onDropIndexClick,
            onReorderClick: onReorderClick,
        }

        const uiOptions = getUiOptions(uiSchema || {})

        /*

        
        const uiToolbar = getUiToolbar({
            ...itemProps,
            "uiSchema": uiSchema,
        })

        */

        const arrayItem = React.cloneElement(item.children, {
            ...itemProps,
            uiSchema: {
                ...uiSchema,
//                    "ui:toolbar": uiToolbar,
//                    "ui:layout": uiOptions.layout || ArrayItemLayout
            },
        })
    
        return arrayItem
    };

    const { uiSchema } = props;

    const uiOptions = getUiOptions(uiSchema)

    const { currentIndex } = uiOptions

    return props.items && props.items.map((item, index) => {
        return renderItem(item, index)
    })

    
    return (
        <LayoutField {...props} uiSchema={uiSchema}>
            {props.items && props.items.map((item, index) => {

                if (currentIndex === index) {
                    return renderItem(item, index)
                }

            })}
        </LayoutField>

    )

}

export default MediaArrayTemplate
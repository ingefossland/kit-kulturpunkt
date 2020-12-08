import React, { useState, useEffect } from 'react';
import createPalette from '@material-ui/core/styles/createPalette';
import tinycolor from 'tinycolor2';

import { utils } from '@kit-ui/schema';
const { getUiOptions } = utils

const CollectionThemePaletteColorField = (props) => {
    const { formData, onChange } = props

    const { ObjectField } = props.registry.fields

    const _getColor = ({main, light, dark, ...color}) => {

        return {
            ...color,
            main: "#" + tinycolor(main).toHex(),
            light: "#" + tinycolor(light).toHex(),
            dark: "#" + tinycolor(dark).toHex(),
        }

    }

    const _onChange = ({main, light, dark}) => {

        let palette, color

        if (main && main !== formData.main) {
            palette = createPalette({primary: { main: main }})
        }

        if (palette && palette.primary) {
            onChange && onChange(_getColor(palette.primary))
        }

    }

    const uiOptions = getUiOptions(props.uiSchema)


    const uiSchema = {
        ...props.uiSchema,
        main: {
            ...props.uiSchema.main,
            "ui:title": uiOptions.title.charAt(0) + " – main"
        },
        light: {
            ...props.uiSchema.light,
            "ui:title": uiOptions.title.charAt(0) + " – light"
        },
        dark: {
            ...props.uiSchema.dark,
            "ui:title": uiOptions.title.charAt(0) + " – dark"
        }
    }


    return (
        <ObjectField {...props} uiSchema={uiSchema} onChange={_onChange} />
    )


}

export default CollectionThemePaletteColorField;

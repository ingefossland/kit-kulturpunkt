import React, { useState, useEffect } from 'react';
import createPalette from '@material-ui/core/styles/createPalette';

const CollectionThemePaletteField = (props) => {

    const { onChange } = props

    const { ObjectField } = props.registry.fields

    const _onChange = (formData) => {

        if (formData.primary.main) {
//            formData = createPalette({primary: {main: formData.primary.main}})
        }

        onChange && onChange(formData)

    }

    return (
        <div>
            <ObjectField {...props} onChange={_onChange} />
        </div>
    )
    
}

export default CollectionThemePaletteField;

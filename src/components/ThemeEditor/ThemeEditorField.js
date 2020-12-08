import React, { useState, useEffect } from 'react';
import createPalette from '@material-ui/core/styles/createPalette';

const CollectionThemeField = ({formData, schema, uiSchema, onChange, ...props}) => {

    return (
        <div>
            { JSON.stringify(formData) }
        </div>
    )
    
}

export default CollectionThemeField;

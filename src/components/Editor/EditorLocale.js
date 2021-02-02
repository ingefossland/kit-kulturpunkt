import React, { useState, useRef } from 'react';
import NavLocale from "../NavLocale/NavLocale"

const EditorLocale = ({className, currentLocale = undefined, languages = [], onLocale}) => {

    if (!languages.length || languages.length === 1) {
        return null
    }

    return (
        <NavLocale options={languages} value={currentLocale || languages[0]} onChange={onLocale} />
    )
        
}

export default EditorLocale
import React from "react"

import Dialog from "../Dialog/Dialog"


const EditorOverlay = (props) => {

    const { expanded, schema = {}, uiSchema = {}, formData = {}, formContext, onChange, template, onClose, children } = props

    if (!expanded) {
        return false
    }

    return (
        <div>
            {JSON.stringify(schema)}
            {JSON.stringify(formData)}

            {children}
           

            <button onClick={() => onClose()}>Close</button>

        </div>
    )


}

export default EditorOverlay
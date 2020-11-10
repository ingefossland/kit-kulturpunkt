import React from "react"
import { useSelector, useDispatch } from 'react-redux';
import { receiveEdit, receiveCurrentId, requestDialog, receiveDialog } from '../redux/editor';

const EditorPreview = ({formData = {}, formContext}) => {
    
    return (
        <div>
            {JSON.stringify(formData)}
        </div>
    )


}

export default EditorPreview
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getEditor } from '../redux/editor';

import Editor from "./Editor"
import model from "../components/CollectionEditor/CollectionEditor.model"

const AppSettings = (props) => {

    const app = useSelector(state => state.app)

    return (
        <Editor {...model} formData={{modelName: "collections", uniqueId: app.collectionId}} />
    )


}

AppSettings.defaultProps = {
}

export default AppSettings
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { bulkAdd, bulkRemove, bulkToggle, bulkReset } from '../redux/bulk';
import { getPreview, getEditor, collapseEditor } from '../redux/finder';

import { getModel, getArtifact, deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';
import qs from 'query-string';

import { ViewBase, ViewHeader } from "../components/KpView"

import ViewTemplate from "./FinderView"

import { SchemaBase } from '@kit-ui/schema';


const schema = {
    "type": "object",
    "properties": {
        "artist": {
            "type": "string"
        },
        "dating": {
            "type": "string"
        }
    }
}

const uiSchema = {
    "ui:options": {
        "spacing": 2
    }

}

const BulkEditor = ({title, ...props}) => {

    const editOptions = [{
        "title": "Lagre"
    }]


    return (
        <ViewBase>
            <ViewHeader title={title} viewOptions={editOptions} />

            <SchemaBase schema={schema} uiSchema={uiSchema} />

        </ViewBase>
    )


}

BulkEditor.defaultProps = {
}

export default BulkEditor
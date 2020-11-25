import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';

import ViewList from "./ViewList"
import ViewTable from "./ViewTable"
import ViewGrid from "./ViewGrid"
import ViewMasonry from "./ViewMasonry"
import ViewGallery from "./ViewGallery"
import ViewColumn from "./ViewColumn"

const FinderView = ({view = "list", template, ...props}) => {

    const { t, i18n } = useTranslation()

    const templates = {
        "list": ViewList,
        "table": ViewTable,
        "grid": ViewGrid,
        "masonry": ViewMasonry,
        "gallery": ViewGallery,
        "column": ViewColumn
    }

    // actions

    const dispatch = useDispatch()

    const _onEdit = ({uniqueId}) => {
        uniqueId && props.history.push(props.location.pathname + '/' + uniqueId + "/edit")
    }

    const _onDelete = ({modelName, uniqueId}) => {
        dispatch(deleteModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onRestore = ({modelName, uniqueId}) => {
        dispatch(restoreModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onErase = ({modelName, uniqueId}) => {
        dispatch(eraseModel({modelName: modelName, uniqueId: uniqueId}))
    }

    const _onSelect = ({modelName, uniqueId}) => {
        dispatch(selectModel({modelName: modelName, uniqueId: uniqueId}))
    }

    // template

    if (!template && templates[view]) {
        template = templates[view]
    } else if (!template) {
        template = "list"
    }
    
    const Template = template

    // sortOptions

    const sortOptions = props.sortOptions && props.sortOptions.map(option => {
        
        if (typeof option === "string" || typeof option === "number") {
            return {
                label: t("sort:"+option),
                value: option
            }
        }

        return option

    })

    // rowsOptions

    const rowsOptions = props.rowsOptions && props.rowsOptions.map(option => {
        
        if (typeof option === "string" || typeof option === "number") {
            return {
                label: t('view:{{rows}} rows', { rows: option }),
                value: option
            }
        }

        return option

    })    

    if (Template) {
        return (
            <Template {...props} sortOptions={sortOptions} rowsOptions={rowsOptions} />
        )
        
    }


}

FinderView.defaultProps = {
}

export default FinderView
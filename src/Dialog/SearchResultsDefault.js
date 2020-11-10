import React, { useState, useEffect } from 'react';
import { getDefaultFormState } from '@kit-ui/schema/lib';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';

import ResultsList from "./ResultsList"
import ResultsGallery from "./ResultsGallery"
import ResultsUploads from "./ResultsUploads"

const templates = {
    "list": ResultsList,
    "gallery": ResultsGallery,
    "uploads": ResultsUploads
}

const SearchResultsDefault = ({schema, formData, onChange, query = {}, results = {}, layout = "list", ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);

    // schema

    let itemSchema;

    if (schema.type === "array") {
        itemSchema = schema.items
    } else {
        itemSchema = schema
    }

    // set selected

    const [modelsSelected, setModelsSelected] = useState([])

    const getSelected = (formData) => {
        let items = []

        if (schema.type === "array") {
            items = formData
        } else {
            items = [formData]
        }

        const selected = items.map(({uniqueId}) => { 
            return uniqueId
        })

        setModelsSelected(selected)
    }

    useEffect(() => {
        getSelected(formData)
    }, [formData])

    // change

    const handleChange = (formData) => {
        const newFormData = getDefaultFormState(schema, formData)
        onChange(newFormData);
        getSelected(newFormData);
    }

    // add

    const addModel = (model) => {

        const item = getDefaultFormState(itemSchema, {
            uniqueId: model.uniqueId,
            model: model
        })

        let newFormData;

        if (schema.type === "array") {
            newFormData = [].concat(formData, item);
        } else {
            newFormData = item
        }

        handleChange(newFormData);

    }

    const handleAdd = (model) => {
        addModel(model)
    }

    // remove

    const removeItem = ({uniqueId}) => {
        return formData.filter(item => item.uniqueId !== uniqueId)
    }
    
    const handleRemove = (model) => {
        const uniqueId = model && model.uniqueId

        console.log('remove', model)

        let newFormData;

        if (schema.type === "array") {
            newFormData = removeItem({uniqueId})
        } else {
            newFormData = getDefaultFormState(itemSchema, {
                uniqueId: undefined,
            })
        }

        handleChange(newFormData);

    }

    // get template

    const ResultsTemplate = templates && templates[layout]

    if (!ResultsTemplate) {
        return (
            <p>No template for {layout}</p>
        )
    }

    return (
        <ResultsTemplate 
            {...props}
            results={{
                ...results,
                selected: modelsSelected
            }}
            query={query}
            onAdd={handleAdd}
            onRemove={handleRemove} />
    )

    
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
    }, 
dispatch);

const mapStateToProps = (state) => {
	return {
        searchById: state.searchById,
        uploadById: state.uploadById
	};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchResultsDefault);
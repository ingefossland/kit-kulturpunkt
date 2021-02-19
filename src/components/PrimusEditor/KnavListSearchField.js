import React, { useState, useEffect } from "react"
import _ from "lodash"

import ListSearch from "./ListSearch"
import ListSearchLayout from "./ListSearchLayout"

import ListResultsLayout from "./ListResultsLayout"
import ListResultsItemLayout from "./ListResultsItemLayout"
import ListResultsAddLayout from "./ListResultsAddLayout"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const KnavListSearchField = (props) => {

    const { schema, uiSchema, formData, onChange } = props

    const _onAdd = (item) => {

        if (formData && Array.isArray(formData)) {
            onChange([
                ...formData,
                item
            ])
        } else {
            onChange([item])
        }


    }

    const _onRemove = ({value}) => {

        const newFormData = formData.filter(item => {
            if (!item.value === value) {
                return item
            }
        })

    }

    const uiOptions = getUiOptions(uiSchema)
    const uiSearch = uiOptions && uiOptions.search || {}

    const { locale = "no", placeholder = "Søk", query = {} } = uiSearch

    const [results, setResults] = useState([])

    const _onQuery = _.debounce((q, event) => {

        let qs = Object.keys(query).map(key => {
            return key + ":" + query[key]
        }) || []

        qs.push("compoundName:" + q)

        const apiUrl = "https://kulturnav.org/api/summary/" + qs.join(',')

        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(results => {
            results && setResults(results)
        })        

    }, 500)

    const [options, setOptions] = useState([])

    const itemsSelected = formData.length && formData.map(item => {
        return item.value
    }) || []

    useEffect(() => {

        let options = []

        results.map(item => {

            const name = item.name && item.name[locale]
            const uuid = item.uuid

            const label = name
            const value = name
    
            let metadata = []

            item.specificType && item.specificType.map(type => {
                if (type.displayValue && type.displayValue[locale]) {
                    metadata.push(type.displayValue[locale])
                }
            })

            value && uuid && options.push({
                uuid: uuid,
                label: label,
                value: value,
                description: metadata.join('/')
            })

        })

        setOptions(options)

    }, [results])

    const ListResults = () => {

        return (
            <ListResultsLayout>
                { options.length && options.map((item, index) => <ListResultsItem {...item} key={index} />) || "" }
                <ListResultsAdd />
            </ListResultsLayout>
        )
    }

    const ListResultsItem = (item) => {

        const { uuid, value, description } = item

        if (item.selected) {
            return <ListResultsItemLayout {...item} onClick={() => _onRemove(item)} />
        }

        return <ListResultsItemLayout {...item} onClick={() => _onAdd(item)} />
    }

    const [expanded, setExpanded] = useState(false)
    const [newData, setNewData] = useState({})

    const ListResultsAdd = () => {

        const { ObjectField } = props.registry.fields

        const _onChange = (formData) => {
            setNewData(formData)
        }

        const _onSubmit = () => {
            _onAdd(newData)
            setNewData({})
        }
    
        const _onToggle = () => {
            setExpanded(expanded => !expanded)
        }
    
        return (
            <ListResultsAddLayout expanded={expanded} onToggle={_onToggle} onSave={_onSubmit}>

                <ObjectField {...props}
                    formData={newData} 
                    schema={{
                        "type": "object",
                        "properties": {
                            "label": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            }
                        }
                    }}
                    uiSchema={{
                        "ui:spacing": 2,
                        "label": {
                            "ui:title": "Tittel",
                            "ui:variant": "standard"
                        },
                        "description": {
                            "ui:title": "Beskrivelse",
                            "ui:variant": "standard"
                        }
                    }}
                    onChange={_onChange}
                />


            </ListResultsAddLayout>
        )

    }

    return (
        <ListSearchLayout registry={props.registry} uiSchema={{"ui:spacing": 2}}>
            <ListSearch placeholder={placeholder} onChange={_onQuery} />
            <ListResults />
        </ListSearchLayout>
    )

}

KnavListSearchField.defaultProps = {
    formData: {
        
    }
}

export default KnavListSearchField
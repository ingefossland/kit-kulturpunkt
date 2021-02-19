import React, { useState, useEffect } from "react"
import Autocomplete from "./AutocompleteOptionsField"

import _ from "lodash"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const KnavSearchField = (props) => {

    const { idSchema, schema, uiSchema, formData = {}, onChange } = props

    const id = idSchema.$id

    // query

    const uiOptions = getUiOptions(uiSchema)

    const { locale = "no", placeholder = "Søk", query = {} } = uiOptions

    const [results, setResults] = useState([])

    const _onQuery = _.debounce((q, event) => {

        let qs = Object.keys(query).map(key => {
            return key + ":" + query[key]
        }) || []

        q && qs.push("compoundName:" + q)

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

    const itemsSelected = []

    const _getOption = (item) => {

        if (uiOptions.getOption) {
            return uiOptions.getOption(item)
        }

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

        return {
            uuid: uuid,
            value: value,
            label: label,
            description: metadata.join("/")
        }
    

    }

    useEffect(() => {

        let options = []

        results.map(item => {

            const option = _getOption(item)

            const { uuid, label, value } = option

            uuid && label && value && options.push(option)

        })

        setOptions(options)    

    }, [results])
    
    let [q, setQ] = useState("")

    const _onInputChange = (event) => {
        const q = event && event.target.value;
        _onQuery(q)
    }

    const _onChange = (option) => {
       option && onChange({
//           ...formData,
           ...option
       })
    }

    // label, helperText, variant

    const label = uiOptions.title
    const helperText = uiOptions.help
    const variant = uiOptions.variant

    const icon = uiOptions.icon
    const endAdornment = uiOptions.endAdornment


    const { LayoutField } = props.registry.fields

    return (
        <LayoutField {...props}>
            <Autocomplete
                id={id}
                icon={icon}
                label={label}
                helperText={helperText}
                variant={variant}
                options={options}
                formData={formData}
                value={formData}
                onChange={_onChange}
                onInputChange={_onInputChange}
                endAdornment={endAdornment}
            />
        </LayoutField>
    )


}

KnavSearchField.defaultProps = {
    formData: {
        
    }
}

export default KnavSearchField
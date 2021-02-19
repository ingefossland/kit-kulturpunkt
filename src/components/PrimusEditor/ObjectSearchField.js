import React, { useState, useEffect } from "react"
import SearchAutocomplete from "./SearchAutocomplete"

import _ from "lodash"
import data from "./data/people.json"
import { makeStyles } from '@material-ui/core/styles';

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const PersonFieldSearch = ({idSchema, schema, uiSchema, formData, onChange, ...props}) => {

    const id = idSchema.$id
    const locale = "no"

//    const options = []

    /*

    data.map(item => {

        const label = item.name[locale]
        const value = item.uuid

        const birthYear = item.begin
        const deathYear = item.end

        const description = [birthYear,deathYear].join("–")
        
        label && value && options.push({
            label: label,
            value: value,
            birthYear: birthYear,
            deathYear: deathYear,
            description: description
        })
    })

    */

    // query

    const [results, setResults] = useState([])

    const _onQuery = _.debounce((q, event) => {

        const apiUrl = "https://kulturnav.org/api/summary/entityType:Person,compoundName:" + q

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

    useEffect(() => {

        let options = []

        results.map(item => {

            const label = item.name[locale]
            const value = item.uuid
    
            const birthYear = item.begin
            const deathYear = item.end
    
            const description = [birthYear,deathYear].join("–")
            
            label && value && options.push({
                label: label,
                value: value,
//                birthYear: birthYear,
//                deathYear: deathYear,
                description: description
            })
        })

        setOptions(options)
    
//        console.log("OPTIONS", options)

    }, [results])
    
    let [q, setQ] = useState("")

    const _onInputChange = (event) => {
        const q = event && event.target.value;
        _onQuery(q)

//        event.target.value && setQ(event.target.value)
    }

    const _onChange = (event, option, reason) => {
       option && onChange({
           ...formData,
           ...option
       })
    }

    const _getHelperText = () => {
        const { label, description } = formData
        return label + " (" + description + ")"
    }

    const uiOptions = getUiOptions(uiSchema)
    const label = uiOptions.title
    const helperText = q || uiOptions.help || _getHelperText()
    const variant = uiOptions.variant

    const icon = "person"
    const endAdornment = props.endAdornment

    return (
        <SearchAutocomplete
            id={id}
            icon={icon}
            label={label}
            helperText={helperText}
            variant={variant}
            options={options}
            value={formData}
            onChange={_onChange}
            onInputChange={_onInputChange}
            endAdornment={endAdornment}
        />
    )


}

PersonFieldSearch.defaultProps = {
    formData: {
        
    }
}

export default PersonFieldSearch
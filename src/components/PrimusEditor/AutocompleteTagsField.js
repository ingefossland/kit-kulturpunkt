import React, { useState} from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography"
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    control: {

    },
    option: {
        fontFamily: "Akkurat, sans-serif"
    },
    title: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        color: theme.palette.text.secondary,

        "&:before": {
            content: '"("'
        },
        "&:after": {
            content: '")"'
        }

    },

}));

const AutocompleteTagsField = ({
    id = "autocomplete", 
    label, 
    helperText,
    placeholder = "Legg til",
    variant = "filled", 
    value, 
    options = [], 
    onChange, 
    onInputChange,
    ...props
}) => {

    const classes = useStyles()

    const _filterOptions = (options, params) => {

        if (props.filterOptions) {
            return props.filterOptions(options, params)
        }

        const filter = createFilterOptions({
            stringify: option => option.label,
        });

        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
            });
        }

        return filtered;
    }

    const _getOptionLabel = (option) => {

        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            return option.inputValue;
        }

        // Regular option
        return option.value;

    }

    const _getOptionHighlight = (value, q) =>  {

        const matches = match(value, q);
        const parts = parse(value, matches);
    
        return parts.map((part, index) => {
            if (part.highlight) {
                return <b className={classes.suggestHighlight} key={index}>{part.text}</b>
            }
            return part.text
        })

    }

    const _renderOption = (option = {}, state) => {
        const { inputValue } = state
        const { label, description } = option

        // highlight

        const title = _getOptionHighlight(label, inputValue)

        return (
            <Typography className={classes.option}>
                <span className={classes.title}>
                    {title}
                </span>
                {' '}
                { description && <i component="i" className={classes.description}>{description}</i> }
            </Typography>
        ) 

    }

    const _renderInput = (params) => {

        if (props.renderInput) {
            return props.renderInput({...params, label, placeholder})
        }

        return (
            <TextField {...params}
                variant={variant}
                label={label}
                placeholder={placeholder}
             />
        )
    }

    const _renderTags = (tags, getTagProps) => {

        if (props.renderTags) {
            return props.renderTags(tags, getTagProps)
        }

        return tags.map((option, index) => (
            <Chip variant="outlined" label={option.value} {...getTagProps({index})} />
        ))

    }

    const _filterTags = (tags) => {

        return tags.map(value => {

            if (typeof value === 'string') {
                value = {
                    value: value,
                }
            } else if (value && value.inputValue) {
                // Create a new value from the user input
                value = {
                    value: value.inputValue,
                }
            } else {
                value = value
            }

            return value

        })

    }


    const _onChange = (event, tags) => {
        const formData = _filterTags(tags)
        onChange && onChange(formData)
    }

    const _onInputChange = (value) => {
        onInputChange && onInputChange(value)
    }

    return (
        <Autocomplete
            multiple
            freeSolo
            value={value}
            onChange={_onChange}
            onInputChange={_onInputChange}
            id={id + "-tags"}
            options={options}
            defaultValue={[]}
            filterOptions={_filterOptions}
            getOptionLabel={_getOptionLabel}
            renderOption={_renderOption}
            renderTags={_renderTags}
            renderInput={_renderInput}
        />
    )

}

export default AutocompleteTagsField
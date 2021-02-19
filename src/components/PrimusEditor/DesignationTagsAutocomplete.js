import React, { useState} from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography"
import RemoveIcon from '@material-ui/icons/RemoveCircle';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    field: {
        "& .MuiAutocomplete-input": {
            flexBasis: "100%"
        }
    },
    tags: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    tag: {
        display: "flex",
        justifyContent: "space-between",
        padding: 8,
        marginLeft: -4,
        marginRight: -4,
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.divider,

    },
    remove: {
        cursor: "pointer",
        opacity: .5,

        "&:hover": {
            opacity: 1,
        }

    },
    option: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",

        "& * + *": {
            marginLeft: theme.spacing(1)
        }

    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
    },
    code: {
        border: '1px solid',
        borderColor: theme.palette.divider,
        padding: theme.spacing(.5),
        borderRadius: 2,
        fontSize: 11,
        lineHeight: 1,
        fontWeight: 'normal',
        textTransform: 'uppercase',
        letterSpacing: '0.075em',   

    }
}));

const TagList = ({children}) => {
    const classes = useStyles()

    return (
        <div className={classes.tags}>
            {children}
        </div>
    )
}

const TagItem = ({value, label, system, systemId, onDelete }) => {
    const classes = useStyles()

    return (
        <div className={classes.tag}>
            <Option title={value} system={system} systemId={systemId} />
            <RemoveIcon onClick={onDelete} className={classes.remove} />
        </div>
    )

}

const Option = ({title, system, systemId}) => {

    const classes = useStyles()

    let code

    if (system && systemId) {
        code = system + " " + systemId
    }

    return (
        <Typography className={classes.option}>
            <span className={classes.title}>{title}</span>
            {' '}
            { code && <span className={classes.code}>{code}</span> }
        </Typography>
    )


}

const AutocompleteTagsField = ({
    id = "autocomplete", 
    label, 
    helperText,
    placeholder = "Legg til betegnelse",
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
            <Option {...option} title={title} />
        )

    }

    const _renderInput = (params) => {

        return (
            <TextField {...params}
                className={classes.field}
                variant="filled"
                label={label}
                placeholder={placeholder}
            />
        )
    }

    const _renderTags = (tags, getTagProps) => {

        return (
            <TagList>
                { tags.map((option, index) => (
                    <TagItem {...option} {...getTagProps({index})} />
                )) }
            </TagList>
        )


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
            disableClearable
            filterOptions={_filterOptions}
            getOptionLabel={_getOptionLabel}
            renderOption={_renderOption}
            renderTags={_renderTags}
            renderInput={_renderInput}
        />
    )

}

export default AutocompleteTagsField
import React from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography"

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";

import Icon from "@material-ui/core/Icon";
import SearchIcon from "@material-ui/icons/Search";

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    control: {

    },
    icon: {
        fontSize: 18,
        marginTop: 17,
        marginRight: 6,

        "& > *": {
            fontSize: "inherit"
        }

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


const KnavSearchAutocomplete = ({
    id, 
    label, 
    helperText,
    icon = <SearchIcon />,
    startAdornment, 
    endAdornment, 
    variant = "filled", 
    value, 
    options = [], 
    onChange, 
    onInputChange
}) => {

    const classes = useStyles()

    const _filterOptions = (options, params) => {

        console.log('params', params)

        const filter = createFilterOptions({
            stringify: option => option.label,
        });

        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
//                label: params.inputValue,
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
    
    const _renderInput = ({InputProps, inputProps}) => {

        if (variant === "base") {
            return (
                <InputBase
                    ref={InputProps.ref}
                    inputProps={inputProps}
                    fullWidth={true}
                    endAdornment={endAdornment}
                />
            )

        } else {

            if (!startAdornment && icon) {
                startAdornment = <Icon className={classes.icon}>{icon}</Icon>
            }

            return (
                <FormControl className={classes.control} fullWidth={true} variant={variant}>
                    <InputLabel className={classes.label} variant={variant} htmlFor={inputProps.id}>{label}</InputLabel>
                    <FilledInput
                        ref={InputProps.ref}
                        inputProps={inputProps}
                        fullWidth={true}
                        startAdornment={startAdornment}
                        endAdornment={endAdornment}
                    />
                    { helperText && <FormHelperText>{helperText}</FormHelperText> }
                </FormControl>
            )
        }

    }

    const _onChange = (event, value) => {

        let formData = {}

        if (typeof value === 'string') {
            formData = {
                value: value,
            }
        } else if (value && value.inputValue) {
            // Create a new value from the user input
            formData = {
                value: value.inputValue,
            }
        } else {
            formData = value
        }

//        setValue(formData)
        onChange && onChange(formData)

    }

    const _onInputChange = (value) => {
        onInputChange && onInputChange(value)
    }

    return (
        <Autocomplete
            freeSolo
            id={id + "-suggest"}
            value={value}
            onChange={_onChange}
            onInputChange={_onInputChange}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={options}
            filterOptions={_filterOptions}
            getOptionLabel={_getOptionLabel}
            renderOption={_renderOption}
            renderInput={_renderInput}
        />        
    )
    
}

export default KnavSearchAutocomplete
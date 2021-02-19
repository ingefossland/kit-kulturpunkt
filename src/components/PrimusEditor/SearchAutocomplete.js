import React, { useState, useEffect } from "react"

import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography";

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";

import Icon from "@material-ui/core/Icon";
import SearchIcon from "@material-ui/icons/Search";

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import data from "./data/people.json"
import { makeStyles } from '@material-ui/core/styles';

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

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

const SearchAutocompleteWidget = ({
        id, 
        label, 
        helperText,
        icon = <SearchIcon />,
        startAdornment, 
        endAdornment, 
        variant = "filled", 
        options, 
        value, 
        onChange,
        onInputChange,
        ...props
    }) => {

    const classes = useStyles()

    const _getOptionHighlight = (label, q) =>  {

        const matches = match(label, q);
        const parts = parse(label, matches);
    
        return parts.map((part, index) => {
            if (part.highlight) {
                return <b className={classes.suggestHighlight} key={index}>{part.text}</b>
            }
            return part.text
        })

    }

    const _renderOption = (option = {}, state) => {
        const { inputValue } = state

        let { label, description } = option

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

    if (!startAdornment) {
        startAdornment = <Icon className={classes.icon}>{icon}</Icon>
    }

    const _renderInput = ({InputProps, inputProps}) => {

        if (variant === "base") {
            return (
                <InputBase
                    ref={InputProps.ref}
//                    InputProps={InputProps}
                    inputProps={inputProps}
                    fullWidth={true}
//                    startAdornment={startAdornment}
                    endAdornment={endAdornment}
                />
            )

        } else {
            return (
                <FormControl className={classes.control} fullWidth={true} variant={variant}>
                    <InputLabel className={classes.label} variant={variant} htmlFor={inputProps.id}>{label}</InputLabel>
                    <FilledInput
                        ref={InputProps.ref}
//                        InputProps={InputProps}
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
    

    return (
        <Autocomplete
            id={id + "-suggest"}
            fullWidth={true}
            options={options || []}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option) => option.value === value.value}

            renderOption={_renderOption}

            value={value}
            onInputChange={onInputChange}
            onChange={onChange}
            
            renderInput={_renderInput}
        />
    )

}

SearchAutocompleteWidget.defaultProps = {
    options: [
        {
            value: "",
            label: "Reset"
        }
    ]
}

export default SearchAutocompleteWidget
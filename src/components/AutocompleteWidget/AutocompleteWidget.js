import React from "react";
import PropTypes from "prop-types";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import TextWidgetPrefix from "../TextWidget/TextWidgetPrefix"
import TextWidgetSuffix from "../TextWidget/TextWidgetSuffix"

import { utils } from "@rjsf/core";
const { asNumber, guessType } = utils;

const nums = new Set(["number", "integer"]);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema, value) => {
    // "enum" is a reserved word, so only "type" and "items" can be destructured
    const { type, items } = schema;

    if (value === "") {
        return undefined;
    } else if (type === "array" && items && nums.has(items.type)) {
        return value.map(asNumber);
    } else if (type === "boolean") {
        return value === "true";
    } else if (type === "number") {
        return asNumber(value);
    }

    // If type is undefined, but an enum is present, try and infer the type from
    // the enum values
    if (schema.enum) {
        if (schema.enum.every((x) => guessType(x) === "number")) {
            return asNumber(value);
        } else if (schema.enum.every((x) => guessType(x) === "boolean")) {
            return value === "true";
        }
    }

    return value;
}

function AutocompleteWidget(props) {
    const {
        schema,
        id,
        options,
        value,
        required,
        disabled,
        readonly,
        multiple,
        autofocus,
        onChange,
        onBlur,
        onFocus,
        placeholder,
    } = props;

    const { enumOptions, enumDisabled } = options;
    const emptyValue = multiple ? [] : "";

    const variant = options.variant || "filled"
    const label = options.title || props.title || props.label
    const helperText = options.help || undefined

    const _onChange = (event, option, reason) => onChange(processValue(schema, option.value));
    const _onBlur = ({ target: { value } }) => onBlur(id, processValue(schema, value));
    const _onFocus = ({ target: { value } }) => onFocus(id, processValue(schema, value));

    /*

    const _onChange = (event, option) => {

        console.log('OPTION', option)

        onChange(processValue(schema, option && option.value || emptyValue));
    }*/

    const autocompleteOptions = enumOptions.map(({value, label}, i) => {
        const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
        return {
            label: label,
            value: value,
            disabled: disabled
        }
    })

    return (
        <Autocomplete
            id={id}
            options={autocompleteOptions}
//            groupBy={options.groupBy}
//            value={value}
//            defaultValue={emptyValue}
            defaultValue={typeof value === "undefined" ? emptyValue : value}
            getOptionSelected={(option) => option.value === value}
            getOptionLabel={(option) => option && option.label}
            onChange={_onChange}
            renderInput={params => (
                <TextField
                    {...params}
                    helperText={helperText}
                    label={label}
                    variant={variant}
                    placeholder={placeholder}
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: <TextWidgetPrefix {...options} />,
                    }}
                />
            )}
        />
    );  


}

AutocompleteWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    AutocompleteWidget.propTypes = {
        schema: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        options: PropTypes.shape({
            enumOptions: PropTypes.array,
        }).isRequired,
        value: PropTypes.any,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        multiple: PropTypes.bool,
        autofocus: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
    }
}

export default AutocompleteWidget;

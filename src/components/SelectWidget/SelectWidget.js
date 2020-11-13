import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { WidgetProps } from "@rjsf/core";
import { utils } from "@rjsf/core";

const { getDisplayLabel, asNumber, guessType } = utils;

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

const SelectWidget = ({
    schema,
    uiSchema = {},
    id,
    options,
//    label,
    required,
    disabled,
    readonly,
    value,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    rawErrors = [],
    ...props
}) => {

    const { enumOptions, enumDisabled } = options;
    const emptyValue = multiple ? [] : "";

    const displayLabel = getDisplayLabel(
        schema,
        uiSchema
        /* TODO: , rootSchema */
    );

    const label = options.title || props.title || props.label || schema.title

    const variant = options.variant || "filled"
    const size = options.size

    const helperText = options.help || null

    const _onChange = ({ target: { value } }) => onChange(processValue(schema, value));
    const _onBlur = ({ target: { value } }) => onBlur(id, processValue(schema, value));
    const _onFocus = ({ target: { value } }) => onFocus(id, processValue(schema, value));

    return (
        <TextField
            variant={variant}
            size={size}
            fullWidth={true}
            id={id}
            label={displayLabel && label}
            helperText={helperText}
            select
            value={typeof value === "undefined" ? emptyValue : value}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            error={rawErrors.length > 0}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            InputLabelProps={{
                shrink: true,
            }}
            SelectProps={{
                multiple: typeof multiple === "undefined" ? false : multiple,
            }}>
            {(enumOptions).map(({ value, label }, i) => {
                const disabled = enumDisabled && (enumDisabled).indexOf(value) != -1;
                return (
                    <MenuItem key={i} value={value} disabled={disabled}>{label}</MenuItem>
                )
            })}
        </TextField>
    )

}

export default SelectWidget;

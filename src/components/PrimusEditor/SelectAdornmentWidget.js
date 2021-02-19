import React from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { WidgetProps } from "@rjsf/core";
import { utils } from "@rjsf/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    select: {
        fontSize: 14,
        height: 24,
        borderRadius: 12,
        margin: theme.spacing(.5),
    },
    empty: {
        color: theme.palette.text.secondary
    }
}));


const { getUiOptions, asNumber, guessType } = utils;

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

    const uiOptions = getUiOptions(uiSchema)
    const label = options.title || schema.name
    const helperText = uiOptions.help

    const _onChange = ({ target: { value } }) => onChange(processValue(schema, value));
    const _onBlur = ({ target: { value } }) => onBlur(id, processValue(schema, value));
    const _onFocus = ({ target: { value } }) => onFocus(id, processValue(schema, value));

    const classes = useStyles()

    return (
        <Select
            id={id}
            variant="outlined"
            className={classes.select}
            value={typeof value === "undefined" ? emptyValue : value}
            displayEmpty={true}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            error={rawErrors.length > 0}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            >
                <MenuItem value=""><em className={classes.empty}>{label}</em></MenuItem>

                {(enumOptions).map(({ value, label }, i) => {
                    const disabled = enumDisabled && (enumDisabled).indexOf(value) != -1;
                    return (
                        <MenuItem key={i} value={value} disabled={disabled}>{label}</MenuItem>
                    )
                })}
        </Select>
    )

}

export default SelectWidget;

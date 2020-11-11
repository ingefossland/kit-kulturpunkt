import React from "react";

import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";

import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        "&[aria-checked=true]": {

            "& $label": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
            }

        }
    },
    label: {
        border: "1px solid",
        borderRadius: "0",
        width: "3em",
        height: "3em",
        fontSize: ".5em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "-.5em"
    }
}));

const ByMonthButton = ({checked, onClick, label }) => {
    const classes = useStyles()

    return (
        <IconButton aria-checked={checked} className={classes.button} onClick={onClick}>
            <span className={classes.label}>{label.substr(0,3)}</span>
        </IconButton>
    )
}

const selectValue = (value, selected, all) => {
    const at = all.indexOf(value);
    const updated = selected.slice(0, at).concat(value, selected.slice(at));

    // As inserting values at predefined index positions doesn't work with empty
    // arrays, we need to reorder the updated selection to match the initial order
    return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
};

const deselectValue = (value, selected) => {
    return selected.filter((v) => v !== value);
};

const ByMonthWidget = ({
    schema,
    //  label,
    id,
    disabled,
    options,
    value,
    autofocus,
    readonly,
    required,
    onChange,
    onBlur,
    onFocus,
    ...props
}) => {
    const { enumOptions, enumDisabled } = options;

    /*
    const _onChange = (option) => ({ target: { checked }}) => {
        const all = (enumOptions).map(({ value }) => value);

        if (checked) {
            onChange(selectValue(option.value, value, all));
        } else {
            onChange(deselectValue(option.value, value));
        }
    };
    */

    const _onToggle = (option) => {
        const all = (enumOptions).map(({ value }) => value);

        if (!option.checked) {
            onChange(selectValue(option.value, value, all));
        } else {
            onChange(deselectValue(option.value, value));
        }
    }

    const _onBlur = ({ target: { value }}) => onBlur(id, value);
    const _onFocus = ({ target: { value }}) => onFocus(id, value);

    const label = options.title || props.title || props.label || "checkboxes"

    return (
        <>
            <FormLabel required={required} htmlFor={id}>
                {label || schema.title}
            </FormLabel>
            <FormGroup row={true}>
                {(enumOptions).map((option, index) => {

                    const checked = value.indexOf(option.value) !== -1;
                    const itemDisabled = enumDisabled && (enumDisabled).indexOf(option.value) != -1;

                    option = {
                        ...option,
                        checked: checked,
                        disabled: disabled || itemDisabled || readonly
                    }

                    return (
                        <ByMonthButton
                            {...option}
                            id={`${id}_${index}`}
                            color="primary"
                            autoFocus={autofocus && index === 0}
                            onClick={() => _onToggle(option)}
                            onBlur={_onBlur}
                            onFocus={_onFocus}
                        />

                    )

                })}
            </FormGroup>
        </>
    )
}

export default ByMonthWidget
import React, { useState, useEffect } from "react"
import moment from "moment"
import model from "./Dating.model"


import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";

import DatingDateField from "./DateField"
import { makeStyles } from '@material-ui/core/styles';

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const useStyles = makeStyles(theme => ({
    control: {

    },
    grid: {
        display: "flex"
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

const DateRangeField = ({idSchema, schema, uiSchema, formData, onChange, ...props}) => {

    const { StringField } = props.registry.fields

    const _onChange = (formData) => {

        const parts = formData.split('-') || []

        const dtStart = parts[0]
        const dtEnd = parts[1] || null

        onChange({
            dtStart: dtStart,
            dtEnd: dtEnd,
            value: formData
        })

    }

    return (
        <StringField {...props} 

            schema={{
                type: "string"
            }}
            uiSchema={uiSchema.value}
            formData={formData.value}
            onChange={_onChange}
        
        />
    )



}

export default DateRangeField
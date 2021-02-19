import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from "@material-ui/core/Icon"

import NavViewButton from "./NavViewButton"

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    buttongroup: {
        display: 'flex',
        alignItems: 'center',
        border: "1px solid",
        borderColor: theme.palette.divider,
        '& > * + *': {
            borderLeft: "1px solid",
            borderColor: theme.palette.divider,
        },
    },
    button: {
        padding: theme.spacing(.5),

        "&[aria-selected=true]": {
            "& > $icon": {
                opacity: .5
            }
        }


    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        fontWeight: "bold",
        margin: 5
    },
    icon: {
        margin: theme.spacing(0, .5),

        "& + $label": {
            display: "none"
        }
        
    }
}));

const RowsOptions = ({className, options = [], value, onChange}) => {
    const { t, i18n } = useTranslation('rows');

    const classes = useStyles()

    const _onChange = (value) => {
        onChange && onChange(value)
    }

    options = options.map(option => {

        if (typeof option === "string" || typeof option === "number") {
            return {
                title: t("{{rows}} rows", {rows: option}),
                value: option,
                onClick: () => _onChange(option)
            }
        }

        return option

    })

    const currentOption = value && options.find(option => option.value === value)

    return (
        <nav className={className}>
            <NavViewButton {...currentOption} label={value} value={value} children={options} />
        </nav>
    )

        
}

export default RowsOptions
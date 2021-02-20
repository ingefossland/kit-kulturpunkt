import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from "@material-ui/core/Icon"

import NavViewButton from "./NavViewButton"
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

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

const SortOptions = ({className, options = [], value, onChange}) => {
    const { t, i18n } = useTranslation('sort');
    const classes = useStyles()

    if (!options.length) {
        return false
    }

    const _onChange = (value) => {
        onChange && onChange(value)
    }

    options = options.map(option => {

        if (typeof option === "string" || typeof option === "number") {
            return {
                title: t(option),
                value: option,
                onClick: () => _onChange(option)
            }
        }

        return option

    })

    const currentOption = value && options.find(option => option.value === value)

    return (
        <nav className={className}>
            <NavViewButton {...currentOption} children={options} />
        </nav>
    )

        
}

export default SortOptions
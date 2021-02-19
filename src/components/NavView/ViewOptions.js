import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from "@material-ui/core/Icon"
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

const icons = {
    "list": "view_stream",
    "table": "view_column",
    "gallery": "view_compact",
    "masonry": "view_quilt",
    "icons": "apps",
    "details": "view_stream",
    "grid": "view_module",
    "column": "view_column",
}


const ViewOptions = ({className, options = [], value, onChange}) => {
    const { t, i18n } = useTranslation('view');
    const classes = useStyles()

    const _onChange = (value) => {
        onChange && onChange(value)
    }

    options = options.map(option => {

        if (typeof option === "string") {
            return {
                icon: icons && icons[option],
                title: t(option),
                value: option,
                onClick: () => _onChange(option)
            }
        }

        return option

    })

    return (
        <nav className={className || classes.buttongroup}>
            { options && options.map((option, index) => {
                const { title, icon, onClick } = option
                
                return (
                    <ButtonBase title={title} key={index} aria-selected={option.value === value} className={classes.button} onClick={onClick}>
                        <Icon className={classes.icon}>{icon}</Icon>
                    </ButtonBase>
                )
                
            })}
        </nav>
    )

        
}

export default ViewOptions
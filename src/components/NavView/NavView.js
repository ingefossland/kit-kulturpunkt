import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import ButtonGroup from '@material-ui/core/ButtonGroup';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from "@material-ui/core/Icon"

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
//            margin: theme.spacing(1),
        },
    },
    button: {
        padding: theme.spacing(.5)
    },
    label: {

    },
    icon: {
        margin: theme.spacing(0, .5),

        "& + $label": {
            display: "none"
        }
        
    }
}));

const viewOptions = {
    "list": {
        "icon": "view_headline",
    },
    "table": {
        "icon": "view_stream",
    },
    "masonry": {
        "icon": "view_quilt",
    },
    "gallery": {
        "icon": "view_module",
    },
    "grid": {
        "icon": "view_module",
    },
    "column": {
        "icon": "view_column",
    }
}


const NavView = ({className, options = [], value, onChange}) => {

    const classes = useStyles()

    const _onChange = (value) => {
        onChange && onChange(value)
    }

    const ButtonView = ({title, value, icon, selected}) => {
        return (
            <ButtonBase className={classes.button} aria-selected={selected} onClick={() => _onChange(value)}>
                <Icon className={classes.icon}>{icon}</Icon>
                <div className={classes.label}>{title}</div>
            </ButtonBase>
        )
    }

    return (
        <nav className={className}>
            <div className={classes.buttongroup}>
                { options && options.map((item, index) => {

                    if (typeof item === "string") {
                        item = {
                            ...viewOptions[item],
                            title: item,
                            value: item
                        }
                    }
                    
                    return (
                        <ButtonView {...item} selected={value === item.value} key={index}/>
                    )
                    
                })}
            </div>
        </nav>
    )

        
}

export default NavView
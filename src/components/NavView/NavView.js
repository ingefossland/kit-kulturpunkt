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
        padding: theme.spacing(.5),

        "&[aria-selected=true]": {
            "& > $icon": {
                opacity: .5
            }
        }


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

const icons = {
    "list": "view_headline",
    "icons": "apps",
    "details": "view_stream",
    "table": "view_stream",
    "masonry": "view_quilt",
    "gallery": "view_compact",
    "grid": "view_module",
    "column": "view_column",
}


const NavView = ({className, options = [], value, onChange}) => {

    const classes = useStyles()

    const _onChange = (value) => {
        onChange && onChange(value)
    }

    const ButtonView = ({title, value, icon, selected}) => {
        return (
            <ButtonBase className={classes.button} aria-selected={selected} onClick={() => _onChange(value)}>
                <Icon className={classes.icon}>{icon || icons[value]}</Icon>
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
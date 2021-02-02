import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from "@material-ui/core/Icon"

import NavViewButton from "./NavViewButton"

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


    return (
        <nav className={className}>
            <div className={classes.buttongroup}>
                { options && options.map((item, index) => {

                    if (typeof item === "string") {
                        item = {
                            title: item,
                            value: item,
                            onClick: () => _onChange(item.value)
                        }
                    }
                    
                    return (
                        <NavViewButton {...item} selected={value === item.value} key={index}/>
                    )
                    
                })}
            </div>
        </nav>
    )

        
}

export default NavView
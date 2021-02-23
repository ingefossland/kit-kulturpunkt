import React, { useRef, useState } from 'react';
import Slider from '@material-ui/core/Slider'
import ZoomInIcon from "@material-ui/icons/AddCircle"
import ZoomOutIcon from "@material-ui/icons/RemoveCircle"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    control: {
        display: 'flex',
        alignItems: 'center',
    },
    slider: {
        width: 100,
        margin: theme.spacing(2)
    },
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

const SizeOptions = ({
        min = 0, 
        max = 200,
        defaultValue = 100,
        value, 
        onChange
    }) => {

    const classes = useStyles()

    const _onChange = (event, value) => {
        onChange && onChange(value)
    }

    return (
        <div className={classes.control}>
            <Slider className={classes.slider} value={value} min={min} max={max} onChange={_onChange} />
        </div>
    )
    
    return (
        <div className={classes.control}>
            <ZoomOutIcon className={classes.icon} />
            <Slider className={classes.slider} defaultValue={value || defaultValue} min={min} max={max} onChangeCommitted={_onChange} />
            <ZoomInIcon className={classes.icon} />
        </div>
    )
        
}

export default SizeOptions
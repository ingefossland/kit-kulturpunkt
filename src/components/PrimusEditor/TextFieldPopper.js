import React, { useState, useEffect, useRef } from "react"
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import Icon from "@material-ui/core/Icon"
import IconButton from "@material-ui/core/IconButton"
import SettingsIcon from "@material-ui/icons/Settings"

import { makeStyles } from '@material-ui/core/styles';

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const useStyles = makeStyles(theme => ({
    control: {
        position: "relative",
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
    overlay: {
        position: "fixed",
        zIndex: 1000,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,.1)"
    },
    paper: {
        padding: theme.spacing(2)
    },

}));

const TextFieldPopper = ({
    id="popperfield",
    variant="filled",
    label,
    helperText,
    value="",
    onChange,
    endAdornment,
    children
}) => {

    const classes = useStyles()

    const inputRef = useRef(null)

    const [open, setOpen] = useState(false)

    const _onFocus = () => {
        setOpen(true)
    }

    const _onBlur = () => {
        setOpen(false)
    }

    return (
        <>
        <ClickAwayListener onClickAway={_onBlur}>
            <FormControl className={classes.control} fullWidth={true} variant={variant}>
                <InputLabel className={classes.label} variant={variant} htmlFor={id}>{label}</InputLabel>
                <FilledInput
                    id={id}
                    autoComplete="off"
                    ref={inputRef}
                    fullWidth={true}
                    value={value}

                    onFocus={_onFocus}
    //                onBlur={_onBlur}
                    onChange={onChange}
                    endAdornment={endAdornment}
                />
                { helperText && <FormHelperText>{helperText}</FormHelperText> }


                <Popper disablePortal={true} open={open} style={{width: "100%", zIndex: 2000}} role={undefined} transition anchorEl={inputRef.current} placement="bottom">
                    <Paper className={classes.paper} elevation={1}>
                        {children}
                    </Paper>
                </Popper>

            </FormControl>
        </ClickAwayListener>
        </>
    )



}

export default TextFieldPopper
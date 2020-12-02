import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    search: {
        position: "relative",
        backgroundColor: theme.palette.background.default,
        minHeight: theme.spacing(8),

        "&[aria-expanded=false]": {
            "& $field": {
                position: "absolute",
                right: 0,
                height: theme.spacing(5),
                margin: theme.spacing(1.5),
                borderRadius: theme.spacing(2.5),
                display: "flex",
                justifyContent: "flex-start",
        
                width: theme.spacing(18),
        
                [theme.breakpoints.down('xs')]: {
                    width: theme.spacing(5),
                },
        
                overflow: "hidden",
                transition: ".125s ease-out",
            },
            "& $input": {
                fontSize: "16px",
                paddingLeft: theme.spacing(6),
                paddingRight: theme.spacing(3),
                overflow: "hidden",
                textOverflow: "ellipsis",
    
                [theme.breakpoints.down('xs')]: {
                    display: "none",
                },
    
                "& + button": {
                    display: "none"
                }
    
            },
            "& $resetButton": {
                width: "100%",
                height: theme.spacing(6),
                borderRadius: theme.spacing(3),
                marginTop: theme.spacing(-.5),
                marginRight: theme.spacing(.5),
                marginBottom: theme.spacing(-.5),
                marginLeft: theme.spacing(.5),
    
                [theme.breakpoints.down('xs')]: {
                    margin: theme.spacing(-.5),
                },
        
                display: "flex",
                justifyContent: "flex-start"
            },            
        },

        "&[aria-expanded=true]": {

            "& $field": {
                width: "100%",
                height: theme.spacing(8),
                margin: 0,
                borderRadius: 0,
    
            },

            "& $input": {
                paddingLeft: theme.spacing(8),
                paddingRight: theme.spacing(8),
            }

        }

    },
    input: {
        backgroundColor: "transparent",
        flexBasis: "100%",
        height: "100%",


        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        lineHeight: "1",
        color: "inherit",
        
        border: "none",
        outline: "none",

        "&:focus + *": {
            opacity: 1
        }
    },
    field: {
        backgroundColor: "white",
        color: theme.palette.text.primary,


        "&[aria-expanded=true]": {
            width: "100%",


            "& button": {
                width: theme.spacing(6),
                height: theme.spacing(6),
                margin: theme.spacing(1),
            },
    
            "& input": {
                fontSize: "18px",
                paddingLeft: theme.spacing(8),
                paddingRight: theme.spacing(8),

                "& + button": {
                    display: "block"
                }
    
            }

        }

    }
    
}));



const AppSearchGrowing = ({expanded = false, value, placeholder, onToggle, onChange, onReset}) => {

    const classes = useStyles()

    const inputRef = useRef(null)


    const ButtonToggle = ({className, disabled, onClick}) => {
        return (
            <IconButton disableRipple className={className} disabled={disabled} onClick={onClick}>
                <SearchIcon />
            </IconButton>
        )
    }

    const ButtonReset = ({className, disabled, onClick}) => {
        return (
            <IconButton disableRipple className={className} disabled={disabled} onClick={onClick}>
                <CloseIcon />
            </IconButton>
        )
    }

    return (
        <div className={classes.search} aria-expanded={expanded}>
            <div className={classes.field}>
                <SearchIcon className={classes.inputIcon} />
                <input
                    ref={inputRef}
                    className={classes.input}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} />
                <ButtonReset className={classes.resetButton} onClick={onReset} />
            </div>
        </div>
    )
}

AppSearchGrowing.defaultProps = {
    expanded: true,
    placeholder: "Search"
}

AppSearchGrowing.propTypes = {
    /** Expanded */
    expanded: PropTypes.bool,
    /** Placeholder */
    placeholder: PropTypes.string,
    /** Query */
    q: PropTypes.string,
    /** onChange */
    onChange: PropTypes.func,
    /** onToggle */
    onToggle: PropTypes.func,
    /** onReset */
    onReset: PropTypes.func
}


export default AppSearchGrowing;
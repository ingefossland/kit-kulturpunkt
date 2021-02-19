import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import NavSearch from "../NavSearch/NavSearch"
import NavSuggest from "../NavSuggest/NavSuggest"

const useStyles = makeStyles(theme => ({
    growingSearch: {
        position: "relative",
        backgroundColor: theme.palette.background.default,
        width: "100%",
        minHeight: theme.spacing(8),
    },
    growingField: {
        backgroundColor: "white",
        color: theme.palette.text.primary,
        transition: ".125s ease-out",

        "&[aria-expanded=false]": {

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
    
            "& $input": {
                fontSize: 16,
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
            "& button": {
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

            display: "flex",
            position: "relative",
            backgroundColor: "white",
            color: "black",
            width: "100%",
            height: theme.spacing(8),
            overflow: "hidden",

            "& $input": {
                paddingLeft: theme.spacing(8),
                paddingRight: theme.spacing(8),
            }

        }
    },
    growingInput: {
        backgroundColor: "transparent",
        flexGrow: 1,
        height: "100%",

        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),

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
    
}));



const AppSearchGrowing = ({className, ...props}) => {

    const classes = useStyles()

    return (
        <NavSearch
            {...props}
            className={className || classes.growingSearch}
            fieldClassName={classes.growingField}
            inputClassName={classes.growingInput}
            />
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
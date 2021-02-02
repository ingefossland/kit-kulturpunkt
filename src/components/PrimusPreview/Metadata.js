import React, { useEffect, useState } from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        width: "100%",
        listStyle: "none",
        padding: 0,
        margin: 0,

        fontFamily: "Akkurat, sans-serif",
        fontSize: "0.875em",
        lineHeight: 1.5,
        borderTop: "1px solid",
        borderColor: "#808080",
        paddingTop: "1em",
        marginTop: "1.5em",
        marginBottom: "1.5em",

    },
    item: {

        "& + $item": {
            marginTop: "0.75em"
        }

    },
    label: {
        fontFamily: '"Akkurat Mono", monospace',
        fontWeight: 'normal',
        fontSize: '0.75em',
        textTransform: 'uppercase',
        letterSpacing: '0.075em',
        color: '#676767',

        "&:after": {
            content: '": "'
        }

    },
    link: {
        borderBottom: "1px solid",
        borderColor: "rgba(0,0,0,.5)",
        "&:hover": {
            cursor: "pointer",
            borderColor: theme.palette.text.primary
        }
    },
    value: {
        fontStyle: "normal",

        "& + $value": {


            "&:before": {
                content: '", "'
            }
                
        }
        
    }
}));

const Metadata = ({items = []}) => {

    const classes = useStyles()

    const MetaList = ({children}) => {
        return (
            <ul className={classes.list}>{children}</ul>
        )
    }

    const MetaValue = ({onClick, children}) => {
        if (onClick) {
            return (
                <a className={classes.link} onClick={onClick}>{children}</a>
            )
        }
        return <span className={classes.value}>{children}</span>
    }

    const MetaLabel = ({children}) => {

        if (!children) {
            return false
        }

        return (
            <b className={classes.label}>{children}</b>
        )

    }

    const MetaValues = ({values}) => {

        return values.map((item, index) => {

            if (typeof item === "string") {
                item = {
                    value: item
                }
            }

            const { value } = item

            return (
                <MetaValue key={index}>{value}</MetaValue>
            )
        })

    }

    const MetaItem = ({name, label, value, values, onClick}) => {

        if (values) {
            return (
                <li className={classes.item} data-name={name}>
                    <MetaLabel>{label}</MetaLabel>
                    <MetaValues values={values} />
                </li>
            )
                
        }

        return (
            <li className={classes.item} data-name={name}>
                <MetaLabel>{label}</MetaLabel>
                <MetaValue onClick={onClick}>{value}</MetaValue>
            </li>
        )

    }

    return (
        <MetaList>
            {items.map((item, index) => <MetaItem {...item} key={index} />)}
        </MetaList>
    )


}

export default Metadata;
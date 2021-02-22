import React, { useEffect, useState } from "react"

import { 
    ModuleSelect, 
    ModuleIcon,
    ModuleImage,
    ModuleTitle,
    ModuleDescription,
    ModuleIdentifier,
    ModuleLabel,
    ModuleDate,
    ModuleToolbar
 } from "../Module"

import Badge from '@material-ui/core/Badge';

import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';
import { getImageUrl } from "./utils"

import moment from "moment"

const useStyles = makeStyles(theme => ({
    row: {
        position: "relative",
        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected
        },
        "&:hover": {
            "& $toolbar": {
                display: "block"
            }
        },

        "&[role=button]": {
            cursor: "pointer",
        },
        
    },
    placeholder: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        minHeight: 48,

        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        lineHeight: 1.5
    },
    toolbar: {
        position: "absolute",
        right: 0,
        display: "none"
    },
    header: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },
    media: {
        flexBasis: 36,
        width: 36,
        height: 36,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 16,
        flexGrow: 1,
        padding: theme.spacing(1)
    },
    value: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "normal",
        fontSize: 14,
        lineHeight: 1.5,
        color: theme.palette.text.secondary,
    },
    tags: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "normal",
        fontSize: 14,
        lineHeight: 1.5,
        color: theme.palette.text.secondary,

        "& * + *": {
            "&:before": {
                content: '", "'
            }
        }
    },
    count: {
    }
}));

const TableModule = ({
    cols = [], 
    sort, 
    placeholder, 
    selectable, 
    selected, 
    onSelect,

    icon,
    title, 
    onClick,

    ...props
}) => {

    const classes = useStyles()

    const {  } = props

    const imageUrl = getImageUrl(props)

    if (placeholder) {
        return (
            <tr className={classes.row} role={onClick && "button"} onClick={onClick}>
                <td colspan={cols.length}><div className={classes.placeholder}>{title}</div></td>
            </tr>
        )
    }

    const ModuleValue = ({children}) => {
        return (
            <Typography className={classes.value} noWrap>{children}</Typography>
        )
    }

    const ModuleTags = ({items = []}) => {

        const count = items.length

        return (
            <Typography className={classes.tags} noWrap>
                { items && items.map((value, index) => <span key={index}>{value}</span> )}
            </Typography>
        )
        
   }

   const ModuleMedia = () => {

        return (
            <div className={classes.media}>
                { !imageUrl && <ModuleIcon icon={icon} /> }
                { imageUrl && <ModuleImage imageUrl={imageUrl} /> }
            </div>
        )

    }

    const ModuleHeader = () => {
        return (
            <header className={classes.header}>
                <ModuleSelect selected={selected} onClick={onSelect} />
                <ModuleMedia />
                <ModuleTitle className={classes.title}>{title}</ModuleTitle>
                <ModuleToolbar className={classes.toolbar} {...props} />
            </header>
        )
    }

    const Column = ({name}) => {

        const value = props[name]

        if (name === "updatedAt") {
            return <ModuleDate datetime={value} />
        }

        if (name === "createdAt") {
            return <ModuleDate datetime={value} format="D. MMM YYYY" />
        }

        if (name === "title") {
            return <ModuleHeader>{value}</ModuleHeader>
        }

        if (name === "identifier") {
            return <ModuleIdentifier>{value}</ModuleIdentifier>
        }

        if (Array.isArray(value) && value.length > 1) {
            return <ModuleTags items={value} />
        } else if (Array.isArray(value)) {
            return <ModuleValue>{value[0]}</ModuleValue>
        }

        return <ModuleValue>{value}</ModuleValue>

    }

    return (
        <tr className={classes.row} role={onClick && "button"} aria-selected={selected} onClick={onClick}>
            { cols.map((name, index) => {

                const selected = sort && sort.startsWith(name)

                if (index === 0) {
                    return <th aria-selected={selected}><Column name={name} key={index} /></th>
                }

                return <td aria-selected={selected}><Column name={name} key={index} /></td>

            })}
        </tr>
    )


}

TableModule.defaultProps = {
    cols: [
        "title",
        "status",
        "updatedAt",
        "createdAt",
        "uniqueId",
    ]
}


export default TableModule;
import React, { useEffect, useState } from "react"

import { 
    ModuleBase,
    ModuleSelect, 
    ModuleIcon,
    ModuleImage,
    ModuleTitle,
    ModuleDescription,
    ModuleIdentifier,
    ModuleStatus,
    ModuleLabel,
    ModuleByline,
    ModuleDate,
    ModuleToolbar
 } from "../Module"

import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';
import { getImageUrl } from "./utils"

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected
        },

        "&[data-deleted=true]": {

            "& h2": {
                color: theme.palette.action.disabled,
            },

            "& img": {
                opacity: .25
            }

        },

        "&[data-erased=true]": {

            "& *": {
                color: theme.palette.action.disabled,
            },

            "& img": {
                opacity: .25
            },

            "& button": {
                opacity: 0
            },

            "& h2": {
                textDecoration: "line-through"
            }

        },

        "&:hover": {
            "& $toolbar": {
                display: "block"
            }
        },

        "&[role=button]": {
            cursor: "pointer",
        },

        "& > th, & td": {
            height: props => { return props.minHeight},
        }
        
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
        display: "none",
        margin: theme.spacing(1)
    },
    header: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    },
    footer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    },
    media: {
        flexShrink: 0,
        flexBasis:  props => { return props.mediaSize },
        width: props => { return props.mediaSize },
        height: props => { return props.mediaSize },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 16,
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

    size = "medium",
    mediaSize = 36,
    minHeight = 48,
    placeholder = false,

    icons = [],
    icon,

    ...props
}) => {


    if (size === "small") {
        mediaSize = 36
        minHeight = 46
    }

    if (size === "medium") {
        mediaSize = 40
        minHeight = 54
    }

    if (size === "large") {
        mediaSize = 56
        minHeight = 70
    }

    const classes = useStyles({mediaSize, minHeight})

    const {

        description,
        metadata,

        status,
        statusLabel,

        updatedAt,
        createdAt,

        documentType,
        documentLabel,
        mediaType,
        mediaLabel,
    
        title, 
        author,
    
        onClick,
        selectable, 
        selected,
        onSelect,
    } = props

    const imageUrl = getImageUrl(props)

    if (placeholder) {
        return (
            <tr className={classes.module} role={onClick && "button"} onClick={onClick}>
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
            <figure className={classes.media}>
                { !imageUrl && <ModuleIcon documentType={documentType} icons={icons} icon={icon} /> }
                { imageUrl && <ModuleImage imageUrl={imageUrl} /> }
            </figure>
        )

    }

    const ModuleHeader = ({title, status}) => {
        return (
            <header className={classes.header}>
                { selectable && <ModuleSelect selected={selected} onClick={onSelect} /> }
                <ModuleMedia />
                <ModuleTitle className={classes.title}>{title}</ModuleTitle>
                {status && <ModuleStatus status={status}>{statusLabel || status}</ModuleStatus> }
                <ModuleToolbar className={classes.toolbar} {...props} selectable={false} />
            </header>
        )
    }

    const ModuleBody = () => {
        return (
            <div className={classes.body}>
                <ModuleDescription>{description || metadata.join(" – ")}</ModuleDescription>
            </div>
        )
    }

    const ModuleFooter = () => {
        return (
            <footer className={classes.footer}>
                <ModuleByline  datetime={updatedAt || createdAt} author={author || "N/A" } />
            </footer>
        )
    }

    const Column = ({name}) => {

        const value = props[name]

        if (name === "title") {
            return <ModuleHeader title={title} />
        }

        if (name === "header") {
            return <ModuleHeader title={title} status={status} />
        }

        if (name === "body") {
            return <ModuleBody>{value}</ModuleBody>
        }

        if (name === "footer") {
            return <ModuleFooter>{value}</ModuleFooter>
        }

        if (name === "label") {
            return <ModuleLabel>{documentLabel || documentType || mediaLabel || mediaType}</ModuleLabel>
        }

        if (name === "status") {
            return <ModuleStatus status={status}>{statusLabel || status}</ModuleStatus>
        }

        if (name === "updatedAt") {
            return <ModuleDate datetime={value} />
        }

        if (name === "createdAt") {
            return <ModuleDate datetime={value} format="D. MMM YYYY" />
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
        <ModuleBase {...props} component="tr" className={classes.module}>
            { cols.map((name, index) => {

                const selected = sort && sort.startsWith(name)

                if (index === 0) {
                    return <th aria-selected={selected}><Column name={name} key={index} /></th>
                }

                return <td aria-selected={selected}><Column name={name} key={index} /></td>

            })}
        </ModuleBase>
    )


}

TableModule.defaultProps = {
    cols: [
        "header",
        "footer",
    ]
}


export default TableModule;
import React, { useEffect, useState } from "react"

import { 
    ModuleSelect, 
    ModuleTitle,
    ModuleDescription,
    ModuleIdentifier,
    ModuleLabel
 } from "../Module"

import ListModule from "./ListModule"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    row: {
        "&[aria-selected=true]": {
            backgroundColor: "#ff0"
        }
    },
    media: {
        width: 48,
        height: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
    header: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
    },
    rows: {
        display: "flex",
        flexDirection: "column",
    },
    cols: {
        display: "flex",
        flexDirection: "row",
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: 16,

    },
    artist: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "normal",
        fontSize: 14,

    },
    toolbar: {
        flexGrow: 0
    },
    tags: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "normal",
        fontSize: 12,
    },
    tag: {

        "& + $tag": {
            "&:before": {
                content: '", "'
            }
        }

    }
}));

const TableModule = ({selected, label, imageUrl, title, identifier, materials, techniques, producer = {}, dating = {}, onClick}) => {

    const classes = useStyles()

    const ModuleTags = ({items}) => {

        if (!items) {
            return false
        }

        return (
            <div className={classes.tags}>
                { items.map(({value}, index) => <span className={classes.tag} key={index}>{value}</span> )}
            </div>
        )
        

    }

    const ModuleHeader = () => {
        return (
            <header className={classes.header}>
                <ModuleSelect selected={selected} />
                <div className={classes.media}>
                    <img src={imageUrl} className={classes.image} />
                </div>

                <div className={classes.rows}>
                <ModuleTitle>{title}</ModuleTitle>

                    <div className={classes.cols}>
                        <ModuleLabel>{label}</ModuleLabel>
                        <ModuleDescription>{ producer.name }</ModuleDescription>
                        <ModuleDescription>{ dating.value }</ModuleDescription>
                    </div>

                </div>



            </header>
        )
    }

    return (
        <tr className={classes.row} aria-selected={selected} onClick={onClick}>

            <th>
                <ModuleHeader />
            </th>

            <td>
                <ModuleIdentifier>{identifier}</ModuleIdentifier>
            </td>

            <td>
                <ModuleDescription>{ producer.name }</ModuleDescription>
            </td>

            <td>
                <ModuleDescription>{ dating.value }</ModuleDescription>
            </td>

            <td>
                <ModuleTags items={materials} />
            </td>

            <td>
                <ModuleTags items={techniques} />
            </td>

        </tr>
    )


}

export default TableModule;
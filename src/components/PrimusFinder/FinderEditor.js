import React, { useEffect, useState } from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    editor: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "block",
        overflowY: "scroll",

        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[4],
    },
    header: {
        position: "sticky",
        minHeight: 96,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
            marginLeft: 6
        }

    }
}));



const FinderEditor = ({selected = 0, count = 0, onCancel, ...props}) => {

    const classes = useStyles()

    const Header = () => {

        return (
            <header className={classes.header}>
                <div>{selected} of {count} items</div>
                <div className={classes.toolbar}>
                    <div onClick={onCancel}>cancel</div>
                </div>
            </header>
        )

    }
    
    return (
        <div className={classes.editor}>
            <Header />
            <div onClick={onCancel}>close</div>
        </div>
    )

}

export default FinderEditor;
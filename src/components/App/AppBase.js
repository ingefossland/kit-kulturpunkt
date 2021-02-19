import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { createAppTheme } from "./utils/createAppTheme"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflow: "hidden",

        display: "flex",
        flexDirection: "column",

    },
}));

/** AppBase sets a backgroundColor and supplies a theme to the application */

const AppBase = ({className, theme, children}) => {
    const classes = useStyles()

    return (
        <ThemeProvider theme={createAppTheme(theme)}>
            <main className={className || classes.root}>
                {children}
            </main>
        </ThemeProvider>
    )
}

AppBase.defaultProps = {
    /** MUI theme or primaryColor */
    theme: {
        primaryColor: "blue"
    }
}

export default AppBase
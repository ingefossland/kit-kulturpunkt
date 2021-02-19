import React, { useEffect, useState } from "react"
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const PreviewTheme = ({darkMode, theme, children}) => {

    const defaultTheme = createMuiTheme({
        palette: {
            media: "#303030"
        }
    })

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            media: "#303030"
        }
    })

    if (darkMode) {
        theme = darkTheme
    } else {
        theme = defaultTheme
    }


    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )


}

export default PreviewTheme;
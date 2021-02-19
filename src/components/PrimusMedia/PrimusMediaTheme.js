import React, { useEffect, useState } from "react"
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const PrimusMediaTheme = ({children}) => {

    const darkTheme = createMuiTheme({
        "palette": {
            "type": "dark",
            "primary": {
                "main": "#D94353",
                "light": "#EE7E8F",
                "dark": "#AE3552"
            }
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
            {children}
        </ThemeProvider>
    )


}

export default PrimusMediaTheme;
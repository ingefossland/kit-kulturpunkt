import React from "react"
import Color from 'color';
import { ThemeProvider, createMuiTheme, getContrastText } from '@material-ui/core/styles';

const createTheme = ({color}) => {

    const backgroundColor = Color(color);

    if (backgroundColor.isDark()) {
        return createMuiTheme({
            palette: {
                type: "dark",
                background: {
                    paper: backgroundColor.hex()
                }
            }
        })
    }

    return createMuiTheme({
        palette: {
            background: {
                paper: backgroundColor.hex()
            }
        }
    })

}

const EditorTheme = ({children, color = "white"}) => {

    let theme;

    if (color === "dark") {
        theme = createMuiTheme({
            palette: {
                type: "dark",
            }
        })
    } else if (color) {
        theme = createTheme({color})
    }
 
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default EditorTheme
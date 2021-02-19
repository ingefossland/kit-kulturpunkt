import Color from 'color';
import { createMuiTheme } from '@material-ui/core/styles';
import overrides from "./theme.overrides"

const getColor = (color = "#666") => {
    return Color(color).hex();
}

const getPalette = ({primaryColor, secondaryColor}) => {

    return {
        primary: {
            main: getColor(primaryColor), 
        },
        secondary: {
            main: getColor(secondaryColor || primaryColor), 
        }
    }

}


export const createAppTheme = ({palette, ...theme}) => {

    return createMuiTheme({
        typography: {
            fontFamily: "Akkurat, sans-serif !important"
        },
        palette: palette || getPalette(theme),
        overrides: overrides
    })


}

export default createAppTheme
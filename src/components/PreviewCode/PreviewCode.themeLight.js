import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    typography: {
        fontFamily: "Akkurat, sans-serif !important"
    },
    palette: {
        code: {
            string: red['A400'],
            boolean: blue['A400'],
            number: blue['A400']
        }
    }
});

export default theme
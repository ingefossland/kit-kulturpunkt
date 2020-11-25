import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const darkTheme = createMuiTheme({
    typography: {
        fontFamily: "Akkurat, sans-serif !important"
    },
    palette: {
        type: "dark",
        code: {
            string: red['A100'],
            boolean: blue['A100'],
            number: blue['A100']
        },
    }
});

export default darkTheme
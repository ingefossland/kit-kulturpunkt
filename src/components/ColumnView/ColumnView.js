import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    columns: {
        display: "flex",
        width: "100%",

//        border: "1px solid",
//        borderColor: theme.palette.divider,

        "& > *": {
            flexBasis: 0,
            flexGrow: 1,
            overflow: "hidden",

            "&:last-child": {
                flexBasis: "50%"
            }


        },

        "& > * + *": {
            borderLeft: "1px solid",
            borderColor: theme.palette.divider
        }

    },

}));

const ColumnView = ({children}) => {

    const classes = useStyles()

    if (!children) {
        return false
    }

    return (
        <div className={classes.columns}>
            {children}
        </div>
    )

}

export default ColumnView;
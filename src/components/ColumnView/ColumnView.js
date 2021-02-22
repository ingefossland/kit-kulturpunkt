import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    columnView: {
        display: "flex",
        width: "100%",
        height: "100%",

        position: "relative",
        border: "1px solid",
        borderColor: theme.palette.divider,

        boxShadow: props => { return theme.shadows[props.elevation]},
        overflow: "hidden",

        "& > *": {
            flexBasis: 0,
            flexGrow: 1,
            overflow: "hidden",
            height: "100%",
            overflowY: "scroll",

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

const ColumnView = ({elevation = 1, children}) => {

    const classes = useStyles({elevation})

    if (!children) {
        return false
    }

    return (
        <div className={classes.columnView}>
            {children}
        </div>
    )

}

export default ColumnView;
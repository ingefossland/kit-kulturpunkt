import React, { useRef, useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        display: "block",
        padding: props => { return theme.spacing(props.paddingY,props.paddingX) },

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        }


    },
}));

const ListView = ({padding = 0, paddingX, paddingY, header, footer, children}) => {

    if (!paddingX) {
        paddingX = padding
    }

    if (!paddingY) {
        paddingY = padding
    }

    const classes = useStyles({padding, paddingX, paddingY})

    return (
        <div className={classes.list}>
            {header}
            {children}
            {footer}
        </div>
    )

}

export default ListView;
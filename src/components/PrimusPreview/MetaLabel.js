import React, { useEffect, useState } from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    label: {
        fontFamily: '"Akkurat Mono", monospace',
        fontWeight: 'normal',
        fontSize: '0.75em',
        textTransform: 'uppercase',
        letterSpacing: '0.075em',
        color: theme.palette.text.secondary,

        "&:after": {
            content: '": "'
        }

    }

}));

const MetaLabel = ({children}) => {

    const classes = useStyles()
    
    return (
        <b className={classes.label}>{children}</b>
    )

}

export default MetaLabel;
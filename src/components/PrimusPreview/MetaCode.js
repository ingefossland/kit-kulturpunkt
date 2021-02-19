import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    code: {
        display: 'inline-block',
        verticalAlign: 'middle',
        border: '1px solid rgba(128, 128, 128, 0.5)',
        padding: '0.25em 0.5em',
        borderRadius: '2px',
        margin: '-1px 0',
        fontSize: '0.625em',
        lineHeight: '1',
        fontWeight: 'normal',
        textTransform: 'uppercase',
        letterSpacing: '0.075em',   
    }
}));

const MetaCode = ({children}) => {

    const classes = useStyles()

    return <span className={classes.code}>{children}</span>



}

export default MetaCode;
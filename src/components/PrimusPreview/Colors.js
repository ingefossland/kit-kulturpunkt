import React, { useEffect, useState } from "react"
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    colors: {
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing(-1)
    },
    color: {
        flexBasis: "20%",
        flexGrow: 0,
        margin: theme.spacing(1)
    },
    swatch: {
        border: "1px solid",
        width: "100%",
        paddingBottom: "100%"
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,

    }
    
}));

const Colors = ({items = []}) => {

    const classes = useStyles()

    const Swatch = ({color}) => {

        const style = {
            backgroundColor: color,
        }

        return (
            <div className={classes.swatch} style={style}>

            </div>
        )

    }

    const Color = ({value, label}) => {

        return (
            <div className={classes.color}>
                <Swatch color={value} />
            </div>
        )

        return (
            <div className={classes.color}>
                <Swatch color={value} />
                <Typography className={classes.label}>{label}</Typography>
            </div>
        )

    }

    return (
        <div className={classes.colors}>
            {items.map((item, index) => <Color {...item} key={index} />)}
        </div>
    )


}

export default Colors;
import React, { useEffect, useState } from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    measures: {
        display: "flex",
    },
    object: {
        flexGrow: 1,
        flexBasis: "50%"
    },
    rectangle: {
        border: "1px solid"
    }
    
}));

const Measures = ({items = []}) => {

    const classes = useStyles()

    const Rectangle = ({width = 1, height = 1}) => {

        const maxWidth = 100
        const maxHeight = height / width * maxWidth

        const style = {
            width: maxWidth,
            height: maxHeight,
        }

        return (
            <div className={classes.rectangle} style={style}>

            </div>
        )

    }

    const Measure = ({measureType, value, description, width, height, depth, unit}) => {

        return (
            <div className={classes.object}>

                {measureType}

                <Rectangle width={width} height={height} />

                <p>{value}</p>
                <p>{description}</p>
            </div>
        )

    }

    return (
        <div className={classes.measures}>
            {items.map((item, index) => <Measure {...item} key={index} />)}
        </div>
    )


}

export default Measures;
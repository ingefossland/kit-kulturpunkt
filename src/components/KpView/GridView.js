import React, { useRef, useEffect, useState } from "react"
import GridModule from "./GridModule"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",

        "& > *": {
            width: 160,
            flexBasis: 160,
            flexShrink: 0,
            flexGrow: 0,
            margin: theme.spacing(1)
        }


    },
}));

const GridView = ({items = [], maxWidth = 160, maxHeight = 160}) => {

    const classes = useStyles()

    return (
        <div className={classes.grid}>

            {items && items.map((item, index) => {

                item = {
                    ...item,
                    width: maxWidth,
                    maxHeight: maxHeight,
                //                    mediaLayout: mediaLayout
                }

                return (
                    <GridModule {...item} key={index} />
                )
 
             })}
        </div>
    )

}

export default GridView;
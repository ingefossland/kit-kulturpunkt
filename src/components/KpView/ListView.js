import React, { useRef, useEffect, useState } from "react"
import { ListModule } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';
import icons from "../KpIcons"

const useStyles = makeStyles(theme => ({
    list: {
        display: "flex",
        flexDirection: "column",

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        }


    },
}));

const ListView = ({items = []}) => {

    const classes = useStyles()

    return (
        <div className={classes.list}>

            {items && items.map((item, index) => {

                const { documentType } = item

                const icon = documentType && icons[documentType]
                
                return (
                    <ListModule {...item} icon={icon} key={index} selectable={true} editable={true} />
                )
 
             })}
        </div>
    )

}

export default ListView;
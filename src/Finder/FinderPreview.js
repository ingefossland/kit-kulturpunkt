import React from 'react';
import ButtonBase from "@material-ui/core/ButtonBase"
import IconButton from "@material-ui/core/IconButton"
import SelectIcon from "@material-ui/icons/ChevronRight"

import Typography from "@material-ui/core/Typography"

import ModuleTitle from "./ModuleTitle"
import ModuleLabel from "./ModuleLabel"
import ModuleMetadata from "./ModuleMetadata"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        width: "100%",
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.divider,


        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

    },

    header: {
        width: "100%",
        flexBasis: 0,
        flexGrow: 1,
//        margin: theme.spacing(1),
        color: "inherit",
        textAlign: "center",

    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 24
    },

    footer: {
        display: "flex",
        overflow: "hidden",
        "& > * + *": {
            marginLeft: theme.spacing(1)
        }
    },
    select: {
        }


}));


const FinderPreview = ({uniqueId, title, description, documentType, selectable, selected, onClick}) => {

    const classes = useStyles()

    return (
        <div className={classes.module} aria-selected={selected} onClick={onClick}>
            <header className={classes.header}>
                <Typography className={classes.title} component="h2">{title}</Typography>
                <Typography className={classes.description} component="h3">{description}</Typography>
                <ModuleLabel>{documentType}</ModuleLabel>
           </header>
            <div className={classes.content}>
            </div>
            <footer className={classes.footer}>
                footer
            </footer>
        </div>

    )

    
}

export default FinderPreview
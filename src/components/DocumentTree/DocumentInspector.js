import React from 'react';
import ButtonBase from "@material-ui/core/ButtonBase"
import IconButton from "@material-ui/core/IconButton"
import SelectIcon from "@material-ui/icons/ChevronRight"

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
        flexGrow: 1,
        margin: theme.spacing(1),
        color: "inherit",

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


const DocumentTreeModule = ({uniqueId, title, children, documentType, selectable, selected, onClick}) => {

    const classes = useStyles()

    return (
        <div className={classes.module} aria-selected={selected} onClick={onClick}>
            <header className={classes.header}>
                <ModuleTitle title={title} />
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

export default DocumentTreeModule
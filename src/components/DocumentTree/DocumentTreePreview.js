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
        overflow: "hidden",
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.divider,

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
//            backgroundColor: theme.palette.primary.main,
//            color: theme.palette.primary.contrastText
        },

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",

    },

    content: {
        flexGrow: 1,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        width: props => { return props.width - 48 - 16 },
        margin: theme.spacing(1),
        color: "inherit",

        "& > *": {
            color: "inherit"
        }

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


const DocumentTreeModule = ({width = 256, uniqueId, title, children, documentType, selectable, selected, onClick}) => {

    const classes = useStyles({width})

    return (
        <div className={classes.module} aria-selected={selected}>
            <div className={classes.content}>
                <ModuleTitle title={title} />
                <footer className={classes.footer}>
                    <ModuleLabel>{documentType}</ModuleLabel>
                    <ModuleMetadata metadata={[uniqueId]}></ModuleMetadata>
                </footer>
            </div>
            {children && 
                <IconButton className={classes.select} onClick={onClick}>
                    <SelectIcon />
                </IconButton>
            }
        </div>

    )

    
}

export default DocumentTreeModule
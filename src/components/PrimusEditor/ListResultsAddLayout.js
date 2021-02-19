import React from "react"
import { NavToolbar } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';

import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import Button from "@material-ui/core/ButtonBase"

import Icon from "@material-ui/core/Icon"
import AddIcon from "@material-ui/icons/Add"



const useStyles = makeStyles(theme => ({
    editor: {
        backgroundColor: "white"
    },
    header: {
        padding: theme.spacing(2),
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16
    },
    body: {
        padding: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2),
        display: "flex",
        "& > * + *": {
            marginLeft: theme.spacing(1)
        }
    },
    primaryButton: {
        display: "flex",
        border: "1px solid",
        padding: theme.spacing(1, 2),
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
    },
    cancelButton: {
        display: "flex",
        margin: theme.spacing(1, 2),
        fontFamily: "Akkurat, sans-serif",
    }
}));

const PrimusListResultsAddLayout = ({children, expanded, label = "Legg til", onToggle, onSave}) => {

    const classes = useStyles()

    if (expanded) {

        return (
            <div className={classes.editor}>

                <header className={classes.header}>{label}</header>

                <div className={classes.body}>
                    {children}
                </div>

                <footer className={classes.footer}>
                    <Button className={classes.primaryButton} onClick={onSave}>Lagre og legg til</Button>
                    <Button className={classes.cancelButton} onClick={onToggle}>Avbryt</Button>
                </footer>
                
            </div>
        )

    }

    return (
        <ListItem button className={classes.item} aria-expanded={false} onClick={onToggle}>
            <ListItemIcon>
                <AddIcon />
            </ListItemIcon>
            <ListItemText>
                {label}
            </ListItemText>
        </ListItem>
    )


    
}

export default PrimusListResultsAddLayout
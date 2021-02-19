import React, { useState, useEffect } from 'react';

import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import Button from "@material-ui/core/ButtonBase"

import Icon from "@material-ui/core/Icon"
import AddIcon from "@material-ui/icons/Add"
import PersonIcon from "@material-ui/icons/Person"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    item: {
        backgroundColor: "white",

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected
        }

    },
}));

const ListResultsItemLayout = ({label, description, value, selected, onClick}) => {

    const classes = useStyles()

    return (
        <ListItem dense button className={classes.item} aria-selected={selected} onClick={onClick}>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText secondary={description}>
                {label} {selected && true }
            </ListItemText>
        </ListItem>
    )
}

ListResultsItemLayout.propTypes = {
}

export default ListResultsItemLayout;
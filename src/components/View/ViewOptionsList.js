import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types"

import Icon from "@material-ui/core/Icon"
import CheckIcon from "@material-ui/icons/Check"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    }
}));

const ViewOptionsList = ({
    value, 
    options,
    onChange
}) => {

    const classes = useStyles()

    const _onSelect = (option) => {
        onChange && onChange(option.value)
    }

    const ListOption = (option) => {
        const { icon, label } = option

        return (
            <ListItem button onClick={() => _onSelect(option)}>
                <ListItemIcon>{ value === option.value && <Icon><CheckIcon /></Icon>}</ListItemIcon>
                <ListItemText primary={label || option.value} />
            </ListItem>
        )

    }

    return (
        <List>
            { options && options.map((option, index) => {
                return <ListOption {...option} key={index} />
            })}
        </List>
    )

}

ViewOptionsList.defaultProps = {
}

ViewOptionsList.propTypes = {
}

export default ViewOptionsList;
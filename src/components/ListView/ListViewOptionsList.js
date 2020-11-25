import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types"

import Icon from "@material-ui/core/Icon"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
    }
}));

const ListSettingsOptions = ({
    value, 
    options,
    onChange
}) => {

    const _onSelect = (value) => {
        onChange && onChange(value)
    }

    const ListOption = (option) => {
        const { icon, label, value } = option

        return (
            <ListItem button onClick={() => _onSelect(value)}>
                { icon && <ListItemIcon><Icon>{icon}</Icon></ListItemIcon> }
                <ListItemText primary={label || value} />
            </ListItem>
        )

    }

    const classes = useStyles()

    return (
        <List>
            { options && options.map((option, index) => {
                return <ListOption {...option} key={index} />
            })}
        </List>
    )

}

ListSettingsOptions.defaultProps = {
}

ListSettingsOptions.propTypes = {
}

export default ListSettingsOptions;
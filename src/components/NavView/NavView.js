import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const NavView = ({menu = [], currentView}) => {
    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null)

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    const ButtonView = ({title, icon}) => {
        return (
            <Button>{title}</Button>
        )
    }

    return (
        <ButtonGroup color="primary">
            { menu && menu.map((item, index) => <ButtonView {...item} key={index} />) }
        </ButtonGroup>
    )

        
}

export default NavView
import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ISO6391 from 'iso-639-1'

import LocaleIcon from "./LocaleIcon"

const NavLocale = ({options = [], value, onChange}) => {
    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null)

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    const _onChange = (value) => {
        onChange && onChange(value)
        setExpanded(false);
    }

    const ListOption = (option) => {
        const { title, value, onClick } = option

        return (
            <ListItem button onClick={onClick}>
                <ListItemIcon><Icon><LocaleIcon value={value} /></Icon></ListItemIcon>
                <ListItemText primary={title || value} />
            </ListItem>
        )

    }

    return (
        <React.Fragment>
            <IconButton onClick={_onToggle} ref={anchorRef}>
                <LocaleIcon value={value} />
            </IconButton>
            <Dropdown expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                <List>
                    { options && options.map((option, index) => {

                        if (typeof option === "string") {
                            option = {
                                title: ISO6391.getNativeName(option) || option,
                                value: option
                            }
                        }

                        const value = option.value

                        return <ListOption {...option} key={index} onClick={() => _onChange(value)} />
                    })}
                </List>
            </Dropdown>
        </React.Fragment>
    )
        
}

export default NavLocale
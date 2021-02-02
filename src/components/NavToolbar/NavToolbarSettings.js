import React, { useRef, useState } from 'react';
import { Dropdown } from "@kit-ui/core"

import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

const NavToolbarSettings = ({options = [], value, ...button}) => {
    const [expanded, setExpanded] = useState(false);

    const anchorRef = useRef(null)

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    const ListOption = (option) => {
        const { icon, title, label, value, onClick } = option

        return (
            <ListItem button onClick={onClick}>
                { icon && <ListItemIcon><Icon>{icon}</Icon></ListItemIcon> }
                <ListItemText primary={title || value} />
            </ListItem>
        )

    }

    return (
        <React.Fragment>

            <Button variant="outlined" onClick={_onToggle} ref={anchorRef}>
                {value}
            </Button>

            <Dropdown expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                <List>
                    { options && options.map((option, index) => {
                        return <ListOption {...option} key={index} />
                    })}
                </List>
            </Dropdown>
        </React.Fragment>
    )
        
}

export default NavToolbarSettings
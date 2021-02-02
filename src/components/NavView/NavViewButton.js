import React, { useRef, useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from "@material-ui/core/Icon"
import { makeStyles } from '@material-ui/core/styles';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';

import { NavActionDropdown, NavActionMenu} from "../NavAction"

const useStyles = makeStyles((theme) => ({
    buttongroup: {
        display: 'flex',
        alignItems: 'center',
        border: "1px solid",
        borderColor: theme.palette.divider,
        '& > * + *': {
            borderLeft: "1px solid",
            borderColor: theme.palette.divider,
        },
    },
    button: {
        padding: theme.spacing(.5),

        "&[aria-selected=true]": {
            "& > $icon": {
                opacity: .5
            }
        }


    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        fontWeight: "bold",
        margin: theme.spacing(.5, 1),
    },
    arrow: {
        marginLeft: theme.spacing(-1)
    },
    icon: {
        margin: theme.spacing(0, .5),

        "& + $label": {
            marginLeft: 0,
//            display: "none"
        }
        
    }
}));

const NavViewButton = ({title, value, icon, selected, children, onClick, onSelect}) => {

    const classes = useStyles()

    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null);

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onSelect = ({onClick, ...item}) => {
        onClick && onClick() || onSelect && onSelect(item)
        setExpanded(false);
    }

    if (children) {
        return (
            <>
            <ButtonBase className={classes.button} aria-selected={selected} onClick={_onToggle} ref={anchorRef}>
                { icon && <Icon className={classes.icon}>{icon}</Icon> }
                <div className={classes.label}>{title}</div>
                <DropDownIcon className={classes.arrow} />
            </ButtonBase>
            <NavActionDropdown placement="bottom-end" open={expanded} anchorEl={anchorRef.current} onClickAway={_onToggle}>
                <NavActionMenu menu={children} onSelect={_onSelect} />
            </NavActionDropdown>
            </>
        )

    }

    return (
        <ButtonBase className={classes.button} aria-selected={selected} onClick={onClick}>
            { icon && <Icon className={classes.icon}>{icon}</Icon> }
            <div className={classes.label}>{title}</div>
        </ButtonBase>
    )

        
}

export default NavViewButton
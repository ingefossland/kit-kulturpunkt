import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconSelected from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    list: {
        position: "relative",
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    item: {
        display: "block",
        padding: theme.spacing(0.25),
        minWidth: theme.spacing(20),
    },
    button: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        padding: theme.spacing(0.5),
        "&:hover": {
            backgroundColor: "rgba(0,0,0,.15)",
        },
        "&[aria-selected=true]": {
            color: "blue"
        }
    },
    icon: {
        color: "inherit",
        minWidth: theme.spacing(2),
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        opacity: 0,
        "&[aria-selected=true]": {
            opacity: 1            
        }

    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: '14px',
        lineHeight: '24px',
        margin: theme.spacing(1)
    }
}));

const ListItem = ({style, value, icon, label, title, selected, onClick, ...props}) => {
    const classes = useStyles(props)
    return (
        <li className={classes.item}>
            <ButtonBase className={classes.button} aria-selected={selected} onClick={onClick}>
                { selected && <IconSelected className={classes.icon} aria-selected={selected} /> }
                { !selected && <IconSelected className={classes.icon} aria-selected={selected} /> }
                <b className={classes.label}>{label || title}</b>
            </ButtonBase>
        </li>
    )
}

const List = ({children, ...props}) => {
    const classes = useStyles(props)
    return (
        <ul className={classes.list}>
            {children}
        </ul>
    )
}

const PathFilters = ({cols, rows, value, options = [], onSelect, ...props}) => {

    return (
        <List>
            {options.map((item, index) => (
                <ListItem {...item} selected={item.value === value} key={index} onClick={() => onSelect(item)}>{item.value}</ListItem>
            ))}
        </List>
    )

}

export default PathFilters;
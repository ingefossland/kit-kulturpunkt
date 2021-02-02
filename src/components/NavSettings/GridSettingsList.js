import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const gridUnit = 56;

const useStyles = makeStyles(theme => ({
    list: {
        position: "relative",
        listStyle: "none",
        padding: 0,
        margin: 0,
        width: props => { return props.cols * gridUnit + "px" },
        height: props => { return props.rows * gridUnit + "px" },
    },
    item: {
        position: "absolute",
        display: "block",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,.125)",
    },
    button: {
        outline: "1px solid white",
        width: props => { return props.cols * gridUnit + "px" },
        height: props => { return props.rows * gridUnit + "px" },

        "&:hover": {
            backgroundColor: "rgba(0,0,0,.5)",
            color: "white",
        },
        "&[aria-selected=true]": {
            backgroundColor: "blue",
            color: "white"
        }
    },
    label: {
        position: "absolute",
        top: 'auto',
        right: 0,
        bottom: 0,
        left: 'auto',
        fontFamily: "Akkurat, sans-serif",
        fontSize: '12px',
        padding: theme.spacing(0.5)
    }
}));

const GridItem = ({size, value, label, selected, onClick, ...props}) => {
    const classes = useStyles(props)
    return (
        <li className={classes.item}>
            <ButtonBase className={classes.button} data-size={size} aria-selected={selected} onClick={onClick}>
                <b className={classes.label}>{label}</b>
            </ButtonBase>
        </li>
    )
}

const GridList = ({children, ...props}) => {
    const classes = useStyles(props)
    return (
        <ul className={classes.list}>
            {children}
        </ul>
    )
}

const OptionsGrid = ({cols, rows, value, options = [], onSelect, ...props}) => {

    return (
        <GridList cols={cols} rows={rows}>
            {options.map((item, index) => (
                <GridItem {...item} selected={item.value === value} key={index} onClick={() => onSelect(item)}>{item.value}</GridItem>
            ))}
        </GridList>
    )

}

export default OptionsGrid;
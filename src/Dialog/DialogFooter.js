import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles(theme => ({
    footer: {
        position: "absolute",
        zIndex: 2,
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: "inherit",

        "& + *": {
            marginBottom: theme.spacing(8)
        }

    },
    navigation: {
        backgroundColor: "inherit",
        width: "100%"
    },
}));

const Menu = withStyles(theme => ({
    root: {
        minHeight: theme.spacing(8)
    }
}))(BottomNavigation);

const MenuItem = withStyles(theme => ({
    root: {
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "12px !important",
    },
    selected: {
    },
}))(BottomNavigationAction);

const DialogFooter = ({menu = [], tabIndex = 0}) => {
 
    const classes = useStyles();

    const [value, setValue] = useState(tabIndex);

    const handleChange = (event, index) => {
        setValue(index)

        if (menu[index].onClick) {
            menu[index].onClick()
        }

    }
    
    return (
        <Paper component="footer" elevation={4} square={true} className={classes.footer}>
            <Menu 
                value={value} 
                onChange={handleChange}
                showLabels
                className={classes.navigation}>
                    { menu && menu.map((item, index) => {
                        return (
                            <MenuItem {...item} key={index} />
                        )
                    })}
            </Menu>
        </Paper>
    )
}

export default DialogFooter
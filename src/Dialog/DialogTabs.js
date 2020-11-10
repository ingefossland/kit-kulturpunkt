import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';

const DialogTabpanel = withStyles(theme => ({
    root: {
        minHeight: theme.spacing(3),
    },
    indicator: {
        bottom: "auto",
        top: 0
    },
}))(Tabs);

const DialogTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        letterSpacing: 0,
        minWidth: 0,
        minHeight: theme.spacing(3),
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: theme.spacing(2),
        color: "inherit",
        '&:hover': {
          color: "inherit",
          opacity: 1,
        },
        '&$selected': {
          opacity: 1,
        },
        '&:focus': {
          opacity: 1,
        },
    },
    selected: {},

}))(props => <Tab disableRipple label={<DialogLabel {...props} />} {...props} />);

const useStyles = makeStyles(theme => ({
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
    },
    title: {
        fontWeight: "bold",
    },
    count: {
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(.5)
    }

}))

const DialogLabel = ({title, count}) => {

    const classes = useStyles()

    return (
        <Typography className={classes.label}>
            <b className={classes.title}>{title}</b>
            { count && <i className={classes.count}>({count})</i> || "" }
        </Typography>
    )
}


const DialogTabs = ({tabs = [], tabIndex = 0}) => {
    const [value, setValue] = useState(tabIndex);

    const handleChange = (event, index) => {
        setValue(index)

        if (tabs[index].onClick) {
            tabs[index].onClick()
        }

    }

    return (
        <DialogTabpanel
            value={tabIndex || value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit">
            { tabs && tabs.map((tab, index) => {
                return (
                    <DialogTab {...tab} value={index} key={index} />
                )
            })}
        </DialogTabpanel>        
    )

}

export default DialogTabs;
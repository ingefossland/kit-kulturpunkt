import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
});

const StyledTabs = withStyles({
    root: {
        padding: 0,
        margin: 0,
        minHeight: "36px"
    },
    indicator: {
      backgroundColor: '#666',
    },
})(Tabs);

const StyledTab = withStyles(theme => ({
    root: {
      textTransform: 'none',
      minWidth: 0,
      minHeight: "36px",
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: 0,
      marginRight: theme.spacing(2),
      fontFamily: "Akkurat, sans-serif",
      fontSize: "14px",
      fontWeight: "bold",
      letterSpacing: 0,
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
  }))(props => <Tab disableRipple {...props} />);

const NavTabs = ({className, tabs = []}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const onTabIndex = (event, index) => {
        setValue(index);

        if (tabs[index].onClick) {
            tabs[index].onClick()
        }

    };

    return (
        <nav className={className || classes.root}>
            <StyledTabs
                value={value}
                onChange={onTabIndex}
                indicatorColor="primary"
                textColor="inherit"
            >
                { tabs && tabs.map((tab, index) => {
                    return (
                        <StyledTab label={tab.label || tab.title} value={index} key={index} />
                    )
                })}
            </StyledTabs>
        </nav>
    );
}

export default NavTabs;
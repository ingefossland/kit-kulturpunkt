import React from 'react';
import Color from 'color';
import SeparatorIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const getColor = (color) => {
    color = Color(color);

    if (color.isDark()) {
        return color.hex()
    } else {
        return 'black'
    }
}

const useStyles = makeStyles(theme => ({
    root: {
//        fontSize: "18px",
//        lineHeight: "24px",
        listStyle: "none",
        color: getColor(theme.palette.primary.main),
        '& li[aria-hidden]': {
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5)
        },
        "& li": {
        }
    }
}));

const Path = ({className, children}) => {
    const classes = useStyles();
    
    return (
        <Breadcrumbs className={className || classes.root} separator={<SeparatorIcon />}>
            {children}
        </Breadcrumbs>
    )

}

export default Path;
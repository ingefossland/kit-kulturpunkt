import React from "react"
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    view: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 48,
        "& > *": {
            fontSize: "inherit"
        }
    },
    
}));

const LoadingView = () => {

    const classes = useStyles()

    return (
        <div className={classes.view}>
            <Icon className={classes.icon}>
                <SearchIcon />
            </Icon>
            <Typography>Sorry, we couldn't find any hits.</Typography>
        </div>
    )

}

export default LoadingView;
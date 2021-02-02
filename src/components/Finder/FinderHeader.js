import React from 'react';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';

const getBackgroundImage = (backgroundColor) => {
    const color = Color(backgroundColor);

    const c1 = color.alpha(0).rgb()
    const c2 = color.alpha(.75).rgb()
    const c3 = color.alpha(1).rgb()

    return "linear-gradient(to bottom, "+c1+") 0%, "+c2+" 75%, "+c3+" 100%)"

}

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        backgroundColor: props => { return props.backgroundColor || theme.palette.background.default},
        backgroundImage: props => { return getBackgroundImage(props.backgroundColor || theme.palette.background.default)},
        height: theme.spacing(8),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        "& + *": {
            marginTop: theme.spacing(6)
        }

    },
}));

const FinderHeader = ({backgroundColor, className, children}) => {
    const classes = useStyles({backgroundColor})

    return (
        <header className={className || classes.root}>
            {children }
        </header>
    )

}

export default FinderHeader;
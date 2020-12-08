import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';

const useStyles = makeStyles(theme => ({
    link: {
        position: "absolute",
        left: -theme.spacing(1.5),
        top: -theme.spacing(3),
    },
    marker: {

    }
}));

const MapLink = ({title}) => {
    const classes = useStyles()

    return (
        <div className={classes.link}>
            <PlaceIcon />
        </div>
    )

    return (
        <div className={classes.link}>
            <IconButton>
                <PlaceIcon />
            </IconButton>
        </div>
    )

}


export default MapLink;
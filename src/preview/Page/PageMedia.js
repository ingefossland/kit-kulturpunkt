import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    media: {
        margin: theme.spacing(2)
    },
}));

const PageImage = ({imageUrl = undefined, language}) => {
    const classes = useStyles()

    if (!imageUrl) {
        return false
    }

    return (
        <figure className={classes.media}>
            <img src={imageUrl} />
        </figure>
    )

}

export default PageImage
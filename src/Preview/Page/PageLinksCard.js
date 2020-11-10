import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    link: {
        width: "100%",
        margin: theme.spacing(.5)
    },
    image: {
        height: theme.spacing(16),
        maxWidth: "100%"
    }
}));

const PageLinksCard = ({title, reference, media, language}) => {
    const classes = useStyles()

    const localeId = "locale:" + language;

    const imageUrl = media && media.imageUrl || reference && reference.imageUrl

    if (typeof title === "object") {
        title = title[localeId] || undefined
    }

    if (!title) {
        title = reference.title
    }


    return (
        <Card className={classes.link}>
            { imageUrl && <CardMedia image={imageUrl} className={classes.image} /> }
            <CardContent>
                <Typography>{title}</Typography>
            </CardContent>
        </Card>
    )    
}

export default PageLinksCard
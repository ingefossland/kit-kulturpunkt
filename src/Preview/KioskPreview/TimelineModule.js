import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        width: '16em',
        backgroundColor: props => { return props.backgroundColor },
    },
    cardMedia: {
        width: "100%",
        paddingBottom: props => { return 9/16 * 100 + "%" },
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        padding: "0.5em 1em",
        justifyContent: props => { return props.justifyContent},
        alignItems: props => { return props.alignItems}
    },
    title: {
        fontSize: "2em",
        lineHeight: 1.2,
        "& + $description": {
            marginTop: theme.spacing(1)
        }
    },
    description: {
        fontSize: "1em",
        opacity: 0.8
    }
}));

const getTextPlacement = ({placement = "top-left"}) => {

    let justifyContent = "center"
    let alignItems = "center"

    // horizontal

    if (placement.includes('left')) {
        alignItems = "flex-start"
    } else if (placement.includes('right')) {
        alignItems = "flex-end"
    }

    // vertical

    if (placement.includes('top')) {
        justifyContent = "flex-start"
    } else if (placement.includes('bottom')) {
        justifyContent = "flex-end"
    }
    
    return {
        justifyContent: justifyContent,
        alignItems: alignItems
    }

}

const MosaicModule = ({imageUrl, title, description, skin, width, height, onClick, ...props}) => {
    const { justifyContent, alignItems } = getTextPlacement(props)
    const classes = useStyles({...props, backgroundColor: "white", justifyContent, alignItems})
   
    return (
        <Card className={classes.card} onClick={onClick}>
            { imageUrl && 
                <CardMedia
                    className={classes.cardMedia}
                    alt={title}
                    image={imageUrl}
                    title={title} />
            }
            <CardContent className={classes.cardContent}>
                <Typography className={classes.title} variant="h6" component="h2">
                    {title}
                </Typography>
                {description &&
                    <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                }
            </CardContent>
        </Card>
    )

}

export default MosaicModule
import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    slideshow: {
        width: "100%",


    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "row",
        transition: "transform .25s ease-in-out",

        transform: props => { return props.transform },

        userSelect: "none"

    },
    item: {
        flexBasis: "100%",
        flexShrink: 0,
        flexGrow: 0,

        opacity: .7,
        transition: "opacity .5s ease-in-out",

        "&[aria-selected=true]": {
            opacity: 1
        }

    },
    figure: {
        position: "relative",
        backgroundColor: theme.palette.media || "#808080",
        width: "100%",
        height: 360,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,

        padding: "2em 2em 4em 2em",
    },
    figcaption: {
        position: "absolute",
        top: "auto",
        right: 0,
        bottom: 0,
        left: 0,
        fontSize: ".75em",
        padding: "1em"
    },
    image: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    },
}));

const MediaSlideshow = ({items = []}) => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const count = items.length;
    const width = count * 100;
    const moveX = width / count

    const translateX = moveX * currentIndex * -1 + "%"
    const transform = "translateX("+translateX+")"

    const classes = useStyles()

    if (!items.length) {
        return false
    }


    const _onIndex = (index) => {
        setCurrentIndex(index)
    }

    const MediaItem = ({mediaId, media, selected, onClick}) => {
        return (
            <li className={classes.item} aria-selected={selected} onClick={onClick}>
                <figure className={classes.figure}>
                    <img src={media.imageUrl} className={classes.image} />
                    <figcaption className={classes.figcaption}>Foto: Nasjonalmuseet</figcaption>
                </figure>
            </li>
        )        
    }


    return (
        <div className={classes.slideshow}>
            <ul className={classes.list} style={{transform: transform}}>
                {items && items.map((item, index) => <MediaItem {...item} selected={index === currentIndex} key={index} onClick={() => _onIndex(index)}/>)}
            </ul>
        </div>
    )


}

export default MediaSlideshow;
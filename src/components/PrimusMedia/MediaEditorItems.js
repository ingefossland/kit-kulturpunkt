import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'query-string';

const useStyles = makeStyles(theme => ({

    list: {
        flexGrow: 0,
        display: "flex",
        height: 56,

        "& > $item": {
            width: "auto"
        }

    },
    item: {
        position: "relative",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,

        border: "1px solid",
        borderColor: "transparent",

        "&[aria-selected=true]": {
            borderColor: "white"
        },

        "& > img": {
            height: "100%",
            width: "auto",
            margin: "auto"
        }

    },    
}));

const MediaLayout = ({
    currentItem = {}, items, onSelect, onSelectIndex
}) => {
    const classes = useStyles();

    const MediaItem = ({ mediaId, media, index }) => {

        const { uploadProgress } = media
        const selected = currentItem.mediaId === mediaId

        const { url, query } = qs.parseUrl(media.imageUrl)

        const imageUrl = qs.stringifyUrl({url, query: {...query, uploadProgress}})

        return (
            <figure className={classes.item} aria-selected={selected} onClick={() => onSelectIndex(index)}>
                <img src={imageUrl} />
            </figure>
        )
    
    }
    
    return (
        <div className={classes.list}>
            {items && items.map((item, index) => <MediaItem {...item} index={index} key={index} />)}
        </div>
    )


}

export default MediaLayout;
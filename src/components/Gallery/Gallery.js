import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { withResizeDetector } from 'react-resize-detector';

const useStyles = makeStyles(theme => ({
    gallery: {
        display: "block",
        padding: props => { return props.padding && theme.spacing(props.padding) },
        width: "100%",
    },
    list: {
        display: "flex",
        flexWrap: "wrap",
        margin: props => { return props.spacing && theme.spacing(props.spacing * -0.5) },
    },
    item: {
        width: props => { return props.width + "px"},
        maxWidth: props => { return props.maxWidth + "px"},
        margin: props => { return props.spacing && theme.spacing(props.spacing * 0.5) },

        "& > *": {
            maxWidth: "100%",
        }
    }
}));

const calculateCutOff = ({rowWidth, delta, spacing, row = []}) => {
//    console.log('delta', delta)

    let cutoff = [];
    let cutsum = 0;

    for(var i in row) {
        var item = row[i];
        var fractOfLen = item.maxWidth / rowWidth;

//        console.log('fractOfLen', fractOfLen)

        cutoff[i] = Math.floor(fractOfLen * delta);
        cutsum += cutoff[i];
    }

//    console.log('cutoff', cutoff)

    var stillToCutOff = delta - cutsum;
    while(stillToCutOff > 0) {
        for(i in cutoff) {
            cutoff[i]++;
            stillToCutOff--;
            if (stillToCutOff < 0) break;
        }
    }

    return cutoff;

}

const getGalleryRow = ({maxWidth, gap, items = []}) => {
    const rowPlusGap = maxWidth + gap;

    var row = [];
    var rowWidth = 0;

//    console.log('items', items)

    while (items.length > 0 && rowWidth < rowPlusGap) {
        let item = items.shift();
        row.push(item);
        rowWidth += (item.maxWidth + gap);
//        console.log('rowWidth' + rowWidth)
    }

    let delta = rowWidth - rowPlusGap;
//    console.log('delta', + delta)

    if (row.length > 0 && delta > 0) {
        var cutoff = calculateCutOff({rowWidth, gap, delta, row});
        for(var i in row) {
            var pixelsToRemove = cutoff[i];
            let item = row[i];
            item.maxWidth = item.maxWidth - pixelsToRemove;
        }
    } else {
        for(var j in row) {
            let item = row[j];
            item.maxWidth = item.maxWidth;
        }
    }

    return row;
    
}

const getGalleryItem = ({props}) => {

    const maxWidth = props.width || props.mediaWidth


}

const getGallery = ({maxWidth, maxRows, gap, children}) => {
    if (!children) return []
    if (!children.length) return [];
    if (!maxWidth) return [];

    const items = React.Children.toArray(children).map((child, index) => {
        return {
            ...child.props,
            maxWidth: child.props.width * 1
        }
    })

//    console.log('items', items)

    let rows = []

    while (items.length > 0) {
        rows.push(getGalleryRow({maxWidth, gap, items}));
    }

    let cols = []

    for(var r in rows) {
        for(var i in rows[r]) {
            var item = rows[r][i];
            if(maxRows) {
                if(r < maxRows) {
                    cols.push(item);
                }
            }
            else {
                cols.push(item);
            }
        }
    }

    return cols

}

const GalleryItem = ({width = 180, maxWidth, spacing = 1, children, debug, ...props}) => {
    const classes = useStyles({width, maxWidth, spacing});

    return (
        <div className={classes.item}>
            {children}
            
            { debug && 
                <div>{width}/{maxWidth}/{spacing}</div>
            }
        </div>
    )

}

const Gallery = ({width, spacing = 1, padding = 0, children, debug = false}) => {

    const maxWidth = width - (padding * 8 * 2)
    const gap = spacing * 8

    const classes = useStyles({padding, spacing});
    const gallery = getGallery({maxWidth, gap, children})

    return (
        <section className={classes.gallery} data-layout="gallery">
            <div className={classes.list}>
                {children.map((child, index) => {

                    const maxWidth = gallery[index] && gallery[index].maxWidth

                    return (
                        <GalleryItem {...child.props} maxWidth={maxWidth} debug={debug} spacing={spacing} key={index}>
                            { child }
                        </GalleryItem>
                    )

                }) }
            </div>
        </section>
    )

}

Gallery.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    children: PropTypes.node 
}

export default withResizeDetector(Gallery);
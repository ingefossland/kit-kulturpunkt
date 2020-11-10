import React from 'react';
import PropTypes from "prop-types";
import { withResizeDetector } from 'react-resize-detector';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    masonry: {
        width: "100%",
//        overflow: "hidden",
    },
    row: {
        display: "flex",
        width: "auto",
        margin: props => { return theme.spacing(props.spacing/2 * -1) },

        "& > *": {
            flexBasis: 0,
            flexGrow: 1,
        }
    },
    col: {
        display: "flex",
        flexDirection: "column",
        width: props => { return props.colWidth },
        maxWidth: props => { return props.colWidth },
    },
    item: {
        margin: props => { return theme.spacing(props.spacing/2) },
        "& > *": {
            display: "block",
            width: "100%"
        }
    }
}));

const Masonry = ({width, columns = 3, spacing = 1, padding = 0, children, debug = false}) => {

    const colWidth = Math.floor(width/columns)

    const classes = useStyles({padding, spacing, colWidth})

    const items = [].concat(children || []);

    const getItemsByColumn = () => {
        let itemsByColumn = {}

        items.map((item, index) => {

            const c = index % columns

            if (!itemsByColumn[c]) {
                itemsByColumn[c] = []
            }

            itemsByColumn[c].push(item)

        })

        return itemsByColumn

    }


    const itemsByColumn = getItemsByColumn()

    return (
        <div className={classes.masonry}>
            <div className={classes.row}>
                {itemsByColumn && Object.values(itemsByColumn).map(items => {
                    return (
                        <div className={classes.col} style={{width: colWidth}}>
                            {items.map(item => {
                                return (
                                    <div className={classes.item}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default withResizeDetector(Masonry);
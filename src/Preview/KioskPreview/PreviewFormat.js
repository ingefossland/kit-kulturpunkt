import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    /*
    perspective: {
        perspective: "1000px",
        perspectiveOriginX: "25%",
        perspectiveOriginY: "75%",
    },
    transform: {
        transform: "rotateY(-45deg)",
    },
    */
    format: {
        position: "relative",
        width: "100%",
        paddingBottom: props => { return props.paddingBottom },
    }
}));

const PreviewFormat = ({format, children}) => {

    let paddingBottom;

    if (format) {
        const size = format.split(":");
        const w = size[0];
        const h = size[1];
        const ratio = h/w;

        paddingBottom = ratio * 100 + "%";
    }

    const classes = useStyles({paddingBottom})

    if (paddingBottom) {
        return (
            <div className={classes.root}>
                <div className={classes.format} data-format={format}>
                    { children }
                </div>
            </div>
        )
    }

    return children

}

export default PreviewFormat
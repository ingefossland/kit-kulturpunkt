import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    format: {
        position: "relative",
        width: "100%",
        minHeight: props => { return props.minHeight },
        paddingBottom: props => { return props.ratio * 100 + "%" },
    }
}));

const LayoutFormat = ({format, minHeight, children}) => {

    let ratio;

    if (format) {
        const size = format.split(":");
        const w = size[0];
        const h = size[1];
        ratio = h/w;
    }

    const classes = useStyles({ratio, minHeight})

    if (ratio || minHeight) {

        return (
            <div className={classes.format}
                data-minHeight={minHeight}
                data-ratio={ratio} 
                data-format={format}>
                { children }
            </div>
        )
           
    }

    return children

}

export default LayoutFormat
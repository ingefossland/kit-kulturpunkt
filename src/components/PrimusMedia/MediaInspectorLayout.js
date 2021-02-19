import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    inspector: {
        backgroundColor: "#444",
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
    },
}));

const MediaInspectorLayout = ({title = "HALLO", children, ...props}) => {
    const classes = useStyles();


    return (
        <div className={classes.inspector}>

            <div>{title}</div>

                {children}
            {JSON.stringify(props)}
        </div>
    )

}

export default MediaInspectorLayout;
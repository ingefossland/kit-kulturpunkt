import React, { useState, useEffect } from 'react';
import MediaDialog from "./MediaDialog"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex"
    },
    dialog: {
        position: "relative",
        zIndex: 1,
        width: "50%"
    },
    results: {
        position: "relative",
        zIndex: 2,
        width: "50%"
    }
}));

const MediaDialogExample = ({query}) => {

    const [formData, setFormData] = useState([])

    const handleChange = (formData) => {
        setFormData(formData)
    }

    query = {
        ...query,
        collectionId: 146
    }

    const schema = {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "mediaId": {
                    "type": "string"
                }
            }
        }
    }

    const dialog = {
        schema: schema,
        formData: formData,
        query: query,
        onChange: handleChange
    }

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.dialog}>
                <MediaDialog {...dialog} />
            </div>
            <Paper className={classes.results}>
                {JSON.stringify(formData)}
            </Paper>
        </div>
    )
    
}

export default MediaDialogExample
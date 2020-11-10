import React, { useState, useEffect } from 'react';
import ReferenceDialog from "./DocumentsDialog"

import { makeStyles } from '@material-ui/core/styles';


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
        width: "50%"
    },
    results: {
        position: "relative",
        width: "50%"
    }
}));

const ReferenceDialogExample = ({query}) => {

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
                "referenceId": {
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
                <ReferenceDialog {...dialog} />
            </div>
            <div className={classes.results}>
                {JSON.stringify(formData)}
            </div>
        </div>
    )
    
}

export default ReferenceDialogExample
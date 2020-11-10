import React, { useState, useEffect } from 'react';
import UploadDialog from "./UploadDialog"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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

const MediaDialogExample = ({query, uploadById}) => {

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
                <UploadDialog {...dialog} />
            </div>
            <Paper className={classes.results}>
                {JSON.stringify(formData)}
                {JSON.stringify(uploadById)}
            </Paper>
        </div>
    )
    
}

const mapStateToProps = (state) => {
	return {
        searchById: state.searchById,
        uploadById: state.uploadById
	};
}

export default connect(
    mapStateToProps,
)(MediaDialogExample);
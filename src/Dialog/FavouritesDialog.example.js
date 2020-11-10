import React, { useState, useEffect } from 'react';
import FavouritesDialog from "./FavouritesDialog"

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

const FavouritesDialogExample = ({query, uploadById}) => {

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

    const favourites = {
        media: [
            "8444a9b1-7304-4212-9c75-4195ce8da017",
            "12cf6f36-8d18-4778-8ac5-ee42bef4bdcd"
        ]
    }

    return (
        <div className={classes.root}>
            <div className={classes.dialog}>
                <FavouritesDialog {...dialog} favourites={favourites} />
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
)(FavouritesDialogExample);
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DialogBase from "./DialogBase"
import DialogFooter from "./DialogFooter"

import SearchIcon from '@material-ui/icons/Search';
import FavouriteIcon from '@material-ui/icons/Favorite';
import UploadIcon from '@material-ui/icons/CloudUpload';
import UploadDoneIcon from '@material-ui/icons/CloudDone';

import Badge from '@material-ui/core/Badge';


import SearchDialog from "./SearchDialog"
import FavoritesDialog from './FavouritesDialog';
import UploadDialog from "./UploadDialog"

const MediaDialog = ({query, favourites, uploadById, ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);

    const [template, setTemplate] = useState("search")

    // get mediaTypes

    let mediaTypes = []

    if (Array.isArray(query.mediaType)) {
        mediaTypes = query.mediaType
    } else if (query.mediaType) {
        mediaTypes = [query.mediaType]
    } else if (query.models === "media") {
        mediaTypes = ['image*','video*','audio*']
    }

    // get upload

    let upload = {
        id: "/dialog/upload",
        accept: []
    }

    mediaTypes && mediaTypes.map(mediaType => {

        if (mediaType.includes('image')) {
            upload.accept.push('image/*')
        }
    
        if (mediaType.includes("video")) {
            upload.accept.push('video/*')
        }
    
        if (mediaType.includes("audio")) {
            upload.accept.push('audio/*')
        }
    
    })    

    const mediaFavourites = favourites && favourites["media"] && favourites["media"].length
    const mediaUploads = uploadById && uploadById[upload.id] && uploadById[upload.id].models

    const FavouriteBadge = () => {
        return (
            <Badge badgeContent={2} variant="dot" invisible={!mediaFavourites && true} color="primary">
                <FavouriteIcon />
            </Badge>
        )
    }

    const UploadBadge = () => {
        return (
            <Badge badgeContent={2} variant="dot" invisible={!mediaUploads && true} color="primary">
                { mediaUploads && <UploadDoneIcon /> || <UploadIcon /> }
            </Badge>
        )
    }

    const menu = [
        {
            label: t("Search"),
            icon: <SearchIcon />,
            onClick: () => setTemplate('search')
        },
        {
            label: t("Favorites"),
            icon: <FavouriteBadge />,
            onClick: () => setTemplate('favourites')
        },
        {
            label: t("Upload"),
            icon: <UploadBadge />,
            onClick: () => setTemplate('upload')
        }
    ]

    return (
        <DialogBase>
            <DialogFooter menu={menu} />
            { template === "search" && <SearchDialog query={query} {...props} /> }
            { template === "favourites" && <FavoritesDialog query={query} favourites={favourites} {...props} /> }
            { template === "upload" && <UploadDialog upload={upload} query={query} {...props} /> }
        </DialogBase>
    )

}

MediaDialog.defaultProps = {
    query: {
        models: "media",
        mediaType: "*"
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
    }, 
dispatch);

const mapStateToProps = (state) => {
	return {
        favourites: state.favourites,
        uploadById: state.uploadById
	};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MediaDialog);
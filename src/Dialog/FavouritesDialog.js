import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DialogBase from "./DialogBase"
import SearchDialog from "./SearchDialog"

const FavouritesDialog = ({query, favourites, ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);

    const search = {
        placeholder: t('Search favorites')
    }

    const getFavouritesQuery = (uniqueIds = []) => {

        if (uniqueIds.length) {
            return {
                ...query,
                q: "uniqueId:" + uniqueIds.join(" OR ")
            }
        } else {
            return {
                ...query,
                q: "uniqueId:false"
            }

        }

        return query

    }

    if (query.models && favourites[query.models]) {
        query = getFavouritesQuery(favourites[query.models])
    }

    return (
        <DialogBase>
            <SearchDialog query={query} search={search} {...props} />
        </DialogBase>
    )

}

FavouritesDialog.defaultProps = {
    favourites: {
        media: [],
        documents: []
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
    }, 
dispatch);

const mapStateToProps = (state) => {
	return {
        favourites: state.favourites,
	};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FavouritesDialog);
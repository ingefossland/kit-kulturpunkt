import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import qs from 'query-string';

import FinderViewList from "./FinderViewList"
import FinderViewGrid from "./FinderViewGrid"
import FinderViewTable from "./FinderViewTable"
import FinderViewIcons from "./FinderViewIcons"
import FinderViewGallery from "./FinderViewGallery"
import FinderViewMasonry from "./FinderViewMasonry"

import FinderViewTree from "./FinderViewTree"
import FinderViewCols from "./FinderViewCols"
import FinderViewApps from './FinderViewApps';

const templates = {
    "apps": FinderViewApps,
    "list": FinderViewList,
    "table": FinderViewTable,
    "icons": FinderViewIcons,
    "grid": FinderViewGrid,
    "gallery": FinderViewGallery,
    "masonry": FinderViewMasonry,
    "tree": FinderViewTree,
    "cols": FinderViewCols
}

const FinderView = ({view, size}) => {

    const location = useLocation()
    const history = useHistory()

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[location.pathname] || {}

    const _onPage = (page) => {
        const sq = location.search && qs.parse(location.search)
        const url = location.pathname + "?" + qs.stringify({...sq, page: page});
        history.replace(url)
    }

    const ViewTemplate = view && templates[view] || templates["list"]

    return <ViewTemplate {...currentSearch} size={size} onPage={_onPage} />

}

export default FinderView
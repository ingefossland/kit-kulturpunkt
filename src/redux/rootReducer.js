import { combineReducers } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'
import siteReducer from './site/siteSlice'
import collectionReducer from './collection/collectionSlice'

import appReducer from './app/appSlice'
import finderReducer from './finder/finderSlice'
import editorReducer from './editor/editorSlice'

import bulkReducer from './bulk/bulkSlice'
import treeReducer from './tree/treeSlice'

import searchByUrlReducer from './searchByUrl/searchByUrlSlice'

import uploadByUrlReducer from './uploadByUrl/uploadByUrlSlice'
import modelsByIdReducer from './modelsById/modelsByIdSlice'

export default combineReducers({
    user: userReducer,
    site: siteReducer,
    collection: collectionReducer,
    app: appReducer,
    editor: editorReducer,
    finder: finderReducer,
    bulk: bulkReducer,
    tree: treeReducer,
    modelsById: modelsByIdReducer,
    searchByUrl: searchByUrlReducer,
    uploadByUrl: uploadByUrlReducer,
})
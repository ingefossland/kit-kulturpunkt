import { combineReducers } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'
import siteReducer from './site/siteSlice'
import collectionReducer from './collection/collectionSlice'

import appReducer from './app/appSlice'
import finderReducer from './finder/finderSlice'
import editorReducer from './editor/editorSlice'
import bulkReducer from './bulk/bulkSlice'

import searchByIdReducer from './searchById/searchByIdSlice'
import uploadByIdReducer from './uploadById/uploadByIdSlice'
import modelsByIdReducer from './modelsById/modelsByIdSlice'

export default combineReducers({
    user: userReducer,
    site: siteReducer,
    collection: collectionReducer,
    app: appReducer,
    editor: editorReducer,
    finder: finderReducer,
    bulk: bulkReducer,
    modelsById: modelsByIdReducer,
    searchById: searchByIdReducer,
    uploadById: uploadByIdReducer,
})
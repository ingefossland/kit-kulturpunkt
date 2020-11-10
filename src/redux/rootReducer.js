import { combineReducers } from '@reduxjs/toolkit'

import appReducer from './app/appSlice'
import editorReducer from './editor/editorSlice'

import searchByIdReducer from './searchById/searchByIdSlice'
import uploadByIdReducer from './uploadById/uploadByIdSlice'
import modelsByIdReducer from './modelsById/modelsByIdSlice'

export default combineReducers({
    app: appReducer,
    editor: editorReducer,
    modelsById: modelsByIdReducer,
    searchById: searchByIdReducer,
    uploadById: uploadByIdReducer,
})
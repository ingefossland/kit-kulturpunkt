import { combineReducers } from '@reduxjs/toolkit'

import appReducer from './app/appSlice'
import finderReducer from './finder/finderSlice'
import editorReducer from './editor/editorSlice'
import bulkReducer from './bulk/bulkSlice'

import searchByIdReducer from './searchById/searchByIdSlice'
import uploadByIdReducer from './uploadById/uploadByIdSlice'
import modelsByIdReducer from './modelsById/modelsByIdSlice'

export default combineReducers({
    app: appReducer,
    editor: editorReducer,
    finder: finderReducer,
    bulk: bulkReducer,
    modelsById: modelsByIdReducer,
    searchById: searchByIdReducer,
    uploadById: uploadByIdReducer,
})
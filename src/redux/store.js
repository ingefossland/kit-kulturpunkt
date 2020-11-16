import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import rootReducer from "./rootReducer"
const middleware = [...getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['editor/receiveDialog'],
      // Ignore these field paths in all actions
//      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
//        ignoredPaths: ['items.dates']
    }
  }), logger]

export default configureStore({
    reducer: rootReducer,
//    middleware
});
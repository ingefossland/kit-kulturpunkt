import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

import { getSite } from "../site"

const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        isLoading: true,
    }, 
    reducers: {
        requestCollection(state, action) {
            return {
                isLoading: true,
            }
        },
        receiveCollection(state, action) {
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        }
    }
})

export const getCollection = ({modelName = "collections", id, uniqueId}) => dispatch => {

    const collectionId = id || uniqueId
    const url = API + '/admin/api/' + modelName + '/' + collectionId;

    dispatch(requestCollection({uniqueId}))

    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
        }})
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(collection => {
            collection.siteId && dispatch(getSite({id: collection.siteId}))
            dispatch(receiveCollection(collection))
        })

}



export const { requestCollection, receiveCollection } = collectionSlice.actions
export default collectionSlice.reducer
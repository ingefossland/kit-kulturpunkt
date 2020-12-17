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

export const getCollection = ({id, uniqueId, siteName, collectionType}) => dispatch => {

    if (id) {
        dispatch(getCollectionById({id}))
    } else if (uniqueId) {
        dispatch(getCollectionById({id: uniqueId}))
    } else if (siteName && collectionType) {
        dispatch(getCollectionByType({siteName, collectionType}))
    }

}

export const getCollectionById = ({id}) => dispatch => {

    const apiUrl = API + '/admin/api/collections/' + id;

    dispatch(requestCollection({id}))

    fetch(apiUrl, {
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
            dispatch(receiveCollection(collection))
        })
    
}

export const getCollectionByType = ({siteName, collectionType}) => dispatch => {

    const apiUrl = API + '/admin/api/collections/search?siteName=' + siteName + "&collectionType="+ collectionType +"&fl=id";

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(results => {
        results.models && results.models[0] && dispatch(getCollectionById(results.models[0]))
    })


}


export const { requestCollection, receiveCollection } = collectionSlice.actions
export default collectionSlice.reducer
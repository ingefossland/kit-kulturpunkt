import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

const siteSlice = createSlice({
    name: 'site',
    initialState: {
        isLoading: true,
    }, 
    reducers: {
        requestSite(state, action) {
            return {
                isLoading: true,
            }
        },
        receiveSite(state, action) {
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        },
        requestSiteCollections(state, action) {
            return {
                ...state,
                collections: undefined
            }
        },
        receiveSiteCollections(state, action) {
            const { models } = action.payload
            return {
                ...state,
                collections: models
            }
        }
    }
})

export const getSite = ({id, uniqueId, name}) => dispatch => {

    if (id) {
        dispatch(getSiteById({id}))
    } else if (uniqueId) {
        dispatch(getSiteById({id: uniqueId}))
    } else if (name) {
        dispatch(getSiteByName({name}))
    }

}    

export const getSiteById = ({id}) => dispatch => {
    const apiUrl = API + '/admin/api/sites/' + id;

    dispatch(requestSite({id}))

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
        .then(site => {
            dispatch(receiveSite(site))
        })
    
}

export const getSiteByName = ({name}) => dispatch => {
    const apiUrl = API + '/admin/api/sites/search?name=' + name + "&fl=id";

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
        results.models && results.models[0] && dispatch(getSiteById(results.models[0]))
    })

}

export const { 
    requestSite, receiveSite,
    requestSiteCollections, receiveSiteCollections
} = siteSlice.actions

export default siteSlice.reducer
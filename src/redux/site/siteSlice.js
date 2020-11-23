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
        }
    }
})

export const getSite = ({modelName = "sites", id, uniqueId}) => dispatch => {

    const siteId = id || uniqueId
    const url = API + '/admin/api/' + modelName + '/' + siteId;

    dispatch(requestSite({uniqueId}))

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
        .then(site => {
            dispatch(receiveSite(site))
        })

}    


export const { requestSite, receiveSite } = siteSlice.actions
export default siteSlice.reducer
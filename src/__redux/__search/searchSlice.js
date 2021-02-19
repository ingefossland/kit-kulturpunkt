import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoading: false,
    }, 
    reducers: {
        requestSearch(state, action) {
            const { url, query } = action.payload

            return {
                isLoading: true,
                url: url,
                query: query
            }

        },
        receiveError(state, action) {
            const { error } = action.payload

            return {
                ...state,
                isLoading: false,
                error: error.toString()
            }

        },
        receiveSearch(state, action) {
            const { result } = action.payload

            return {
                ...state,
                isLoading: false,
                result: result
            }

        },
    }
})

export const getQuery = ({models, ...query}) => dispatch => {
    
    let url = API + '/admin/api/' + models + '/search';
    
    const sq = qs.stringify(query)

    if (sq) {
        url = url + '?' + sq;
    }

    dispatch(requestSearch({url, query}))
    
    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(result => {
        dispatch(receiveSearch({result}))
    })

}

export const { requestSearch, receiveSearch, receiveError } = searchSlice.actions
export default searchSlice.reducer
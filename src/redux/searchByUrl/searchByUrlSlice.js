import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

import { getModels } from "../modelsById"

const searchByUrlSlice = createSlice({
    name: 'search',
    initialState: {
    }, 
    reducers: {
        requestSearch(state, action) {
            const { models, url, page, apiUrl, query } = action.payload

            if (state[url] && state[url].page) {
                return {
                    ...state,
                    [url]: {
                        ...state[url],
                        isLoading: true,
                        apiUrl: apiUrl,
                        query: {
                            ...query,
                            models: models,
                        }
                    }
                }
            }

            return {
                ...state,
                [url]: {
                    isLoading: true,
                    apiUrl: apiUrl,
                    query: {
                        ...query,
                        models: models,
                    }
                }
            }
        },
        receiveError(state, action) {
            const { url, error } = action.payload

            return {
                ...state,
                [url]: {
                    isLoading: false,
                    error: error.toString()
                }
            }

        },
        receiveSearch(state, action) {
            const { url, results } = action.payload

            return {
                ...state,
                [url]: {
                    ...state[url],
                    isLoading: false,
                    results: results
                }
            }
        },
        receivePage(state, action) {
            const { url, page, results } = action.payload

            const { start, rows, count } = results

            const pages = Math.ceil(count/rows)
            const currentPage = Math.ceil((start+rows)/rows)

            const resultsByPage = {
                ...state[url].resultsByPage,
                [page]: results.models
            }

            let resultsLoaded = []

            Object.values(resultsByPage).map(page => {
                resultsLoaded = resultsLoaded.concat(page)
            })

            let nextPage, prevPage

            for (let p = page; p <= pages; p++) {
                if (!resultsByPage[p]) {
                    nextPage = p
                    break
                }
            }    

            for (let p = page; p >= 1; p--) {
                if (!resultsByPage[p]) {
                    prevPage = p
                    break
                }
            }    

            return {
                ...state,
                [url]: {
                    ...state[url],
                    count: count,
                    start: start,
                    rows: rows,
                    page: currentPage,
                    pages: pages,
                    nextPage: nextPage,
                    prevPage: prevPage,
                    resultsByPage: resultsByPage,
                    resultsLoaded: resultsLoaded
                }
            }

        }
    }
})

export const getQuery = ({models, url, page = 1, ...query}) => dispatch => {

    if (page > 1 && query.rows) {
        query.start = query.rows * (page-1)
    }
    
    const sq = qs.stringify(query)

    let apiUrl = API + '/admin/api/' + models + '/search';

    if (sq) {
        apiUrl = apiUrl + '?' + sq;
    }

//    if (page === 1) {
        dispatch(requestSearch({models, url, page, apiUrl, query}))
//    }
    
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
        dispatch(receiveSearch({url, results}))
        dispatch(receivePage({url, page, results}))

        results.models && dispatch(getModels(results))

    })

}




export const { requestSearch, receiveSearch, receivePage, receiveError } = searchByUrlSlice.actions
export default searchByUrlSlice.reducer
import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

const searchByIdSlice = createSlice({
    name: 'search',
    initialState: {
    }, 
    reducers: {
        requestSearch(state, action) {
            const { models, id, page, url, query } = action.payload

            if (state[id] && state[id].page) {
                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        isLoading: true,
                        url: url,
                        query: {
                            ...query,
                            models: models,
                            id: id
                        }
                    }
                }
            }

            return {
                ...state,
                [id]: {
                    isLoading: true,
                    url: url,
                    query: {
                        ...query,
                        models: models,
                        id: id
                    }
                }
            }
        },
        receiveError(state, action) {
            const { id, error } = action.payload

            return {
                ...state,
                [id]: {
                    isLoading: false,
                    error: error.toString()
                }
            }

        },
        receiveSearch(state, action) {
            const { id, results } = action.payload

            return {
                ...state,
                [id]: {
                    ...state[id],
                    isLoading: false,
                    results: results
                }
            }
        },
        receivePage(state, action) {
            const { id, page, results } = action.payload

            const { start, rows, count } = results

            const pages = Math.ceil(count/rows)
            const currentPage = Math.ceil((start+rows)/rows)

            const resultsByPage = {
                ...state[id].resultsByPage,
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
                [id]: {
                    ...state[id],
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

export const getQuery = ({models, id, page = 1, ...query}) => dispatch => {
    let url = API + '/admin/api/' + models + '/search';

    if (page > 1 && query.rows) {
        query.start = query.rows * (page-1)
    }
    
    const sq = qs.stringify(query)

    if (sq) {
        url = url + '?' + sq;
    }

//    if (page === 1) {
        dispatch(requestSearch({models, id, page, url, query}))
//    }
    
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
    .then(results => {
        dispatch(receiveSearch({id, results}))
        dispatch(receivePage({id, page, results}))
    })

}


export const { requestSearch, receiveSearch, receivePage, receiveError } = searchByIdSlice.actions
export default searchByIdSlice.reducer
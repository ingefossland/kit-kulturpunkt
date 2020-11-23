import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
    }, 
    reducers: {
        requestUser(state, action) {
            return {
                isLoading: true,
            }
        },
        receiveUser(state, action) {
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        }
    }
})

export const getUser = ({modelName = "users", uniqueId}) => dispatch => {

    const url = API + '/admin/api/' + modelName + '/' + uniqueId;

    dispatch(requestUser({uniqueId}))

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
        .then(formData => {
            dispatch(receiveUser(formData))
        })

}    


export const { requestUser, receiveUser } = userSlice.actions
export default userSlice.reducer
import axios from 'axios'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILES_REQUEST,
    USER_DETAILES_SUCCESS,
    USER_DETAILES_FAIL,
    USER_DETAILES_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    My_ORDER_LIST_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_SUCCESS,
    USER_DELETE_REQUEST,
} from "./types"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.post(
            'api/users/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
        })
    }
}
export const logout = () =>  (dispatch) => {

    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILES_RESET})
    dispatch({type: My_ORDER_LIST_RESET})
    dispatch({type: USER_LIST_RESET})
    
    }


// Register Action
    export const register = (name,email,password) => async (dispatch) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST })
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }
            const {data} = await axios.post(
                'api/users',
                { name, email, password },
                config
            )
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

        localStorage.setItem('userInfo',JSON.stringify(data))

        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:  error.response && error.response.data.message
                ? error.response.data.message
                :error.message
            })
        }
        
        }

// User details Action

export const getUserDetails = (id) => async (dispatch,getState) => {
        try {
            dispatch({ type: USER_DETAILES_REQUEST })
            const {token } = getState().userLogin.userInfo
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.get(
                `api/users/${id}`,
                config
            )
            dispatch({
                type: USER_DETAILES_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: USER_DETAILES_FAIL,
                payload:  error.response && error.response.data.message
                ? error.response.data.message
                :error.message
            })
        }
}
                
        // User Update Profile Action
        
        export const updateUserProfile = (user) => async (dispatch,getState) => {
            try {
                dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
                const {token } = getState().userLogin.userInfo
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios.put(
                    `api/users/profile`,
                    user,
                    config
                    )
                    dispatch({
                    type: USER_UPDATE_PROFILE_SUCCESS,
                    payload: data
                })
                
            } catch (error) {
                dispatch({
                    type: USER_UPDATE_PROFILE_FAIL,
                    payload:  error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
                })
            }
            
            }
    
        // User Update Profile Action

    export const listUsers = () => async (dispatch,getState) => {
            
        try {
                dispatch({ type: USER_LIST_REQUEST })
                const {token } = getState().userLogin.userInfo
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios.get(
                    `/api/users/`,
                    config
                )
                dispatch({
                    type: USER_LIST_SUCCESS,
                    payload: data
                })
    
            } catch (error) {
                dispatch({
                    type: USER_LIST_FAIL,
                    payload:  error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
                })
            }
            
            }


// User Update Profile Action

export const deleteUser = (id) => async (dispatch,getState) => {
            
        try {
                dispatch({ type: USER_DELETE_REQUEST })
                const {token } = getState().userLogin.userInfo
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

               await axios.delete(
                    `/api/users/${id}`,
                    config
                )
                //  await axios.delete(
                //     `/api/users/${id}`,
                //     config
                // )
                
                dispatch({
                    type: USER_DELETE_SUCCESS,
                })
              
    
            } catch (error) {
                dispatch({
                    type: USER_DETAILES_FAIL,
                    payload:  error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message
                })
            }
            
            }
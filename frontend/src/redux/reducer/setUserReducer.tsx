import React from 'react'
import { User } from './../../models/User';

const intialState = {
    user:new User()
}


export const setUserReducer = (state=intialState,action:{type:string,user:User}) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user : action.user
            }
        default:
            return state
    }
}

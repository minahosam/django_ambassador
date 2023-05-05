import { User } from "../../models/User"

const initialState = {
    user : new User()
}

export const userReducer = (state=initialState,action:{type:string,user:User}) => {
    switch (action.type) {
        case 'SETUSER':
            
            return {
                ...state,
                user: action.user
            }
    
        default:
            return state
    }
}
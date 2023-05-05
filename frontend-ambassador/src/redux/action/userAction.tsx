import { User } from "../../models/User";

export const SetUserAction = (user:User) => ({
    type : 'SETUSER',
    user
})
import { User } from "../../models/User";

export const setUser = (user: User)  => ({
  type:'SET_USER',
  user  
})
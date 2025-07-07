import { createUser, fetchUser } from "../api/user";

export default class UserService {

    static async create(token: string){
        try{
            return await createUser(token)
        }
        catch(err){
            console.error(err)
        }
    }

    static async get(token: string){
        try{
           return  await fetchUser(token)
        }
        catch(err){
            console.error(err)
        }
    }

}
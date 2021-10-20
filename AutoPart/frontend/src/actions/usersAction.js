import {USERS} from "../constants/actionTypes";
import getuser from '../services/userList.service';

export const GetUser = () => async(dispatch) => {

    try {
        const result = await getuser.getdata(); 
        console.log("Отиманий user:", result);        
        dispatch({type: USERS, payload: result.data});    
    }
    catch(error) {
        console.log("Неможливо отримати користувачів",error);
    }
}
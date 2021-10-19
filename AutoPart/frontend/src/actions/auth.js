import authService from "../services/auth.service";
import { REGISTER, REGISTER_BEGIN, REGISTER_FAILED } from "../constants/actionTypes";

//import { useHistory } from "react-router-dom";

export const RegisterUser = (model) => async (dispatch) => {
    //const history = useHistory();

    try {
        dispatch({type: REGISTER_BEGIN});
        const result = await authService.register(model);
        console.log("register reuslt", result);
        dispatch({type: REGISTER, payload: model.email});
        
        return Promise.resolve(result);
        
    }
    catch(err) {
        const {data} = err.response;
        //console.log("register error", );
        dispatch({type: REGISTER_FAILED, payload: data.errors});
        
        //console.log("Propblem register");
        return Promise.reject(data);
    }
}
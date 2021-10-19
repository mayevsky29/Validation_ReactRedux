import { LOGIN, REGISTER, REGISTER_BEGIN, REGISTER_FAILED } from "../constants/actionTypes";

const initialState ={
    isAuth: false,
    username: "",
    loading: false
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case REGISTER_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                loading: false

            }
        }
        case REGISTER:
        case LOGIN: {
            return {
                isAuth: true,
                username: payload,
                loading: false
            };
        } 
        default: {
            return state;
        }
    }
    

}

export default authReducer;
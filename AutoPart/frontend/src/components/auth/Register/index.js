import React from 'react'
import { Formik, Form } from 'formik';
import { useHistory } from "react-router-dom";
import authService from '../../../services/auth.service';
import MyTextInput from '../../common/MyTextInput';
import validationFields from './validation';
import { useDispatch } from 'react-redux';
import { REGISTER } from '../../../constants/actionTypes';
import axiosService from '../../../services/axiosService';


const RegisterPage = () => {

    const initState = {
        email: '',
        phone: '',
        firstName: '',
        secondName: '',
        password: '',
        confirmPassword: ''
    }
    const history = useHistory();
    const dispatch = useDispatch();

    // const onSubmitHandler = async (values) => {

    //     try {
    //         const result = await authService.register(values);
    //         console.log("Server is good ", result);
    //         dispatch({type: REGISTER, payload: values.email});
    //         history.push("/");
    //     }
    //     catch (error) {
    //         console.log("Server is bad ", error.response);
    //     }

        // const onSubmitHandler = (values) => {
        //     axiosService.send('api/auth/register', values)
        //     .then(data => {
        //         dispatch({type: "REGISTER_USER", payload: {
        //             firstName: values.firstName,
        //             lastName: values.secondName,
        //             phone: values.phone,
        //             email: values.email
        //         }});
        //         history.push('/');
        //     })
        //     .catch(error => {
        //         var response = error.response;
        //         alert(response.data.error[0].description);
        //     });



            const onSubmitHandler = async (values) => {
                try {
                    const result = await authService.register(values);
                    console.log("Server is good ", result);
                    var jwt_token=result.data.token;
                    dispatch({ type: REGISTER, payload: verified });
                    localStorage.setItem('Current user',jwt_token);
                    console.log("Local:",localStorage);
                    authTokenRequest(jwt_token);
                    history.push("/");
                }
                catch (err) {
        
                    var res = err.response.data.errors;
        
                    console.log("Errors:", res);
                    let answer_errors = {
                        email: '',
                    };
        
                    if (res.Email) {
                        let str = "";
                        res.Email.forEach(element => {
                            str += element + " ";
                        });
                        answer_errors.email = str;
                    }
                    dispatch({ type: ERRORS, payloads: answer_errors.email });
        
                    console.log("Server is bad ", error.response);
                }
    }

    return (
        <div className="row">
            <div className="offset-md-3 col-md-6">
                <h1 className="text-center">Реєстрація</h1>
                <Formik
                    initialValues={initState}
                    validationSchema={validationFields()}
                    onSubmit={onSubmitHandler}
                >
                    <Form>
                        <MyTextInput
                            label="Електронна пошта"
                            name="email"
                            id="email"
                            type="email" />

                        <MyTextInput
                            label="Телефон"
                            name="phone"
                            id="phone"
                            type="text" />

                        <MyTextInput
                            label="Прізвище"
                            name="secondName"
                            id="secondName"
                            type="text" />

                        <MyTextInput
                            label="Ім'я"
                            name="firstName" 
                            id="firstName"
                            type="text" />

                        <MyTextInput
                            label="Пароль"
                            name="password"
                            id="password"
                            type="password"/>

                        <MyTextInput
                            label="Підтвердження пароль"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password" />

                        <button type="submit" className="btn btn-primary">Реєстрація</button>
                    </Form>
                </Formik>
            </div>

        </div>
    )
}


export default RegisterPage

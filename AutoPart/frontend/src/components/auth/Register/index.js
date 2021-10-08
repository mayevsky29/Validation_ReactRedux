import React from 'react'
import { Formik, Form } from 'formik';
import { useHistory } from "react-router-dom";
import authService from '../../../services/auth.service';
import MyTextInput from '../../common/MyTextInput';
import validationFields from './validation';
import { useDispatch } from 'react-redux';
import { REGISTER } from '../../../constants/actionTypes';


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

    const onSubmitHandler = async (values) => {

        try {
            const result = await authService.register(values);
            console.log("Server is good ", result);
            dispatch({type: REGISTER, payload: values.email});
            history.push("/");
        }
        catch (error) {
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

import React, {useRef} from 'react'
import { Formik, Form } from 'formik';
import { push } from "connected-react-router";
//import { useHistory } from "react-router-dom";
import MyTextInput from '../../common/MyTextInput';
import validationFields from './validation';
import { useDispatch, useSelector } from 'react-redux';
import MyPhotoInput from '../../common/MyPhotoInput';
import { RegisterUser } from '../../../actions/auth';
import EclipseWidget from '../../common/eclipse';



const RegisterPage = () => {

    const initState = {
        email: '',
        phone: '',
        firstName: '',
        secondName: '',
        photo: null,
        password: '',
        confirmPassword: ''
    }
    //const history = useHistory();
    const dispatch = useDispatch();
    const { loading, errors } = useSelector(state => state.auth);
    const refFormik = useRef();
    const titleRef = useRef();

    const onSubmitHandler = async (values) => {

        console.log("errors", errors);
        try {            
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => formData.append(key, value));
            dispatch(RegisterUser(formData))
                .then(result => {
                    dispatch(push("/"));
                })
                .catch(ex=> {
                    Object.entries(ex.errors).forEach(([key, values]) => {
                        let message = '';
                        values.forEach(text=> message+=text+" ");
                        refFormik.current.setFieldError(key,message);
                    });
                    titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
                });
        }
        catch (error) {
            console.log("Server is bad register from", errors);
        }
    }

    return (
        
        <div className="row">
            <div className="offset-md-3 col-md-6">
                <h1 ref={titleRef} className="text-center" >Реєстрація</h1>
                <Formik
                    innerRef = {refFormik}
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
                        
                        <MyPhotoInput 
                            refFormik={refFormik}
                            field="photo" />

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

            {loading && <EclipseWidget />}
        </div>
    )
}


export default RegisterPage

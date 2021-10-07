import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import authService from '../../../services/auth.service';
import TextBoxField from '../../common/TextBoxField';


export class RegisterPage extends Component {

    state = {
        email: '',
        phone: '',
        firstName: '',
        secondName: '',
        password: '',
        confirmPassword: ''
    }

    onChangeHandler = (e) => {
        //console.log("onChange name", e.target.name);
        //console.log("onChange value", e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitFormHandler = async (e) => {
        e.preventDefault();
        console.log("Посилаємо на сервер", this.state);
        // authService.register(this.state)
        //     .then(result=>{
        //         console.log("Server is good ", result);
        //     },
        //     error => {
        //         console.log("Server is bad ", error);
        //     })
        //     .catch(errorServer => {

        //     });


        try{
            const result = await authService.register(this.state);
            console.log("Server is good ", result);
            this.props.history.push("/");
        }
        catch(error) {
            console.log("Server is bad ", error.response);
        }
    }

    render() {
        //console.log("state", this.state);
        const { email, phone, firstName, secondName, password, confirmPassword} = this.state;
        return (
            <div className="row">
                <div className="offset-md-3 col-md-6">
                <h1 className="text-center">Реєстрація</h1>
                <form onSubmit={this.onSubmitFormHandler}>
                    <TextBoxField 
                        field="email"
                        label="Електронна пошта"
                        value={email}
                        onChangeHandler={this.onChangeHandler}/>

                    <TextBoxField 
                        field="phone"
                        label="Телефон"
                        value={phone}
                        onChangeHandler={this.onChangeHandler}/>

                    <TextBoxField 
                        field="secondName"
                        label="Прізвище"
                        value={secondName}
                        onChangeHandler={this.onChangeHandler}/>

                    <TextBoxField 
                        field="firstName"
                        label="Ім'я"
                        value={firstName}
                        onChangeHandler={this.onChangeHandler}/>

                    <TextBoxField 
                        field="password"
                        type="password"
                        label="Пароль"
                        value={password}
                        onChangeHandler={this.onChangeHandler}/>

                    <TextBoxField 
                        field="confirmPassword"
                        type="password"
                        label="Підтвердження пароль"
                        value={confirmPassword}
                        onChangeHandler={this.onChangeHandler}/>
                    
                    <button type="submit" className="btn btn-primary">Реєстрація</button>
                </form>
                </div>

            </div>
        )
    }
}

export default withRouter(RegisterPage)

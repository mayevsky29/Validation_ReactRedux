import React, {useState} from 'react'

// якщо використовується функція то рендерити не потрібно
// export class LoginPage extends Component {
    const LoginPage = () => {
    
        const[name, setName] = useState()
        
        
       const onClickChangeName =(e) =>{
            e.preventDefault();
            setName("Сало");
        }
        return (
            <div>
                <h1>Вхід на сайт</h1>
                <input 
                type="text" 
                className="form=control"
                name="name"
                value={name}
                />
                <input type="button" onClick={onClickChangeName} value="Вхід"></input>
            </div>
        )
    }


export default LoginPage

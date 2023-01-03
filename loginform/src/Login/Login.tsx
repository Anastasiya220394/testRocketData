import { useState } from 'react';
import './Login.css';
import { EMAIL_REGEXP } from './constants';
import { loginUserRequest } from './LoginService';

const Login = () => {
    const [userName, setUserName] = useState<string>('');
    const [userPass, setUserPass] = useState<string>('');
    const [isErrorPass, setErrorPass] = useState<boolean>(false);
    const [isErrorUserName, setErrorUserName] = useState<boolean>(false);

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorPass(true)
        setUserPass(e.target.value)
    }

    const handleChangeUSerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
        if(!isEmailValid(e.target.value)) {
            setErrorUserName(true)
        } else {
            setErrorUserName(false)
        }
    }

    function isEmailValid(value: string) {
        return EMAIL_REGEXP.test(value);
    }

    const handleRequestLogin = async (e: any) => {
        e.preventDefault();
        try {
            await loginUserRequest({
              login: userName,
              password: userPass,
            });
        } catch (error) {
            if (!(error instanceof Error)) return;
            console.log(error)
        }
    }

    return (
        <div className="Login">
            <p className="h2">Вход</p>
            <p className="text">Для существующих пользователей</p>
            <form>
                <div className="textInput">
                    <div>
                        <span>E-Mail: </span>
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <input 
                    type='email' 
                    value={userName} 
                    onChange={(e) => handleChangeUSerName(e)}
                    style={{borderColor: isErrorUserName ? 'rgba(227, 39, 39, 0.982)' : 'rgb(215, 215, 215)'}}
                    placeholder='Введите E-Mail'
                    />
                    {isErrorUserName ? <span className="error">Укажите корректный email адрес</span> : null}
                </div>
                <div className="textInput">
                    <div>   
                        <span>Пароль: </span>
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <input 
                    type='password' 
                    value={userPass} 
                    onChange={(e) => handleChangePass(e)}
                    style={{borderColor: isErrorPass && userPass.length < 8 ? 'rgba(227, 39, 39, 0.982)' : 'rgb(215, 215, 215)'}}
                    placeholder='Введите пароль'
                    />
                    {isErrorPass && userPass.length < 8 ? <span className="error">Минимум 8 символов</span> : null}
                </div>
                <button 
                className="btnLogin"
                type="submit"
                onClick={handleRequestLogin}
                >
                    Войти в систему
                </button>
            </form>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import s from './Auth.module.css';
import {$host} from '../http/index';
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    //const [auth, setAuth] = useState(false);
    //const navigate = useNavigate();
    const validateEmail = (email) => {
        return email && email.includes('@');
    };

    const handleSubmit = (e) => {
        if (validateEmail(email)) {
            alert("Ссылка для входа отправлена на указанный email!");
            $host.post('/auth', {email, userName});
        }
        else {
            alert("Некорректный email!");
        }
    };

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email"> Email:</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="name"> Имя:</label>
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
                    <input type="submit" value="Зарегистрироваться!" />
                </form>
            </div>
        </div>
    );
};

export default Auth;
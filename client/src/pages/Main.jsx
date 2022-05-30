import React, { useEffect, useState } from 'react';
import {$host} from '../http/index';
import { useNavigate, useParams } from "react-router-dom";
import LoadImage from '../components/LoadImage';
import Lenta from '../components/Lenta';

const Main = () => {
    const [auth, setAuth] = useState(false);
    const params = useParams();
    const [userId, setUserId] = useState('0');
    const [photos, setPhotos] = useState([]);
    const [count, setCount] = useState(0); 

    useEffect(() => {
        $host.post('/check', {link: params.link}).then(res => {
            setAuth(res.data.checkLink);
            setUserId(res.data.userId);
        })
    }, []);

    useEffect(() => {
        $host.get('/getAllPhotos').then(res => {
            setPhotos(res.data.rows);
        });
    }, [count]);

    const onCountChange = () => {
        setCount(count+1);
    };

    return (
        <div>
            {auth ?
            <div>
                <LoadImage userId={userId} onCountChange={onCountChange}/>
                <Lenta userId={userId} photos={photos}/>
                <div>Главная страница!!!!</div>
            </div>
            :
            <div>Ошибка доступа!!!!</div>
            }
        </div>
    );
};

export default Main;
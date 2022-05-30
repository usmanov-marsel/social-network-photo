import React, { useRef } from 'react';
import s from './LoadImage.module.css';
import {$host} from '../http/index';

const LoadImage = ({userId, onCountChange}) => {
    const fileInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("img", fileInput.current.files[0]);
        formData.append("userId", userId);
        $host.post('/createPhoto', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(res => onCountChange());
    }

    return (
        <div className={s.container}>
            <form onSubmit={handleSubmit}>
                <label>
                    Загрузите фотографию:
                    <input type="file" ref={fileInput}/>
                </label>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default LoadImage;
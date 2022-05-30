import React, { useEffect, useState } from 'react';
import s from './Photo.module.css';
import Icon from './Icon';
import { $host } from '../http/index';

const Photo = ({photo, userId}) => {
    const [countLiked, setCountLiked] = useState(0);
    const isPhotoLiked = false;

    useEffect(() => {
        $host.get('/countLike', {
            params: {
                photoId: photo.id
            }
        }).then(res => setCountLiked(res.data))
    }, []);

    const likePhoto = async (e) => {
        setCountLiked(countLiked + 1);
        const likedPhoto = await $host.post('/like', {userId, photoId: photo.id});
        isPhotoLiked = !isPhotoLiked;
    };

    return (
        <div className={s.container}>
            <div>
                <img className={s.picture} src={`http://localhost:5000/${photo.path}`} alt=""/>
            </div>
            <div className={s.wrapper_liked}>
                <button 
                className={s.liked}
                onClick={likePhoto}
                >
                    <Icon name='liked_svg'></Icon>
                </button>
                <div className={s.count_liked_user}>{countLiked} людям понравилось</div>
            </div>
        </div>
    );
};

export default Photo;
import React from 'react';
import Photo from './Photo';
import s from './Lenta.module.css';

const Lenta = ({photos, userId}) => {

    return (
        <div className={s.listPhotos}>
        {
            photos.map(photo => {
                return <Photo photo={photo} userId={userId} key={photo.id} />;
        })}
        </div>
    );
};

export default Lenta;
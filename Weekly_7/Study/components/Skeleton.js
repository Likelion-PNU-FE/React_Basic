import React from 'react';
import '../styles/Skeleton.css';

const Skeleton = () => {
    return (
        <div className='skeleton_item'>
            <div className='skeleton_poster'></div>
            <div className='skeleton_text'></div>
            <div className='skeleton_text'></div>
        </div>
    );
};

export default Skeleton;

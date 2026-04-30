import React from 'react';
import './Skeleton.css';

const Skeleton = ({ className, type = 'rect', width, height, style }) => {
    const styles = {
        width,
        height,
        ...style,
    };

    return (
        <div
            className={`skeleton skeleton-${type} ${className || ''}`}
            style={styles}
        ></div>
    );
};

export default Skeleton;

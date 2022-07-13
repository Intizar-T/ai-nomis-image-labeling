import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const LionImage = () => {
    const [image] = useImage('https://konvajs.org/assets/lion.png');
    return <Image image={image} />;
};

export default LionImage;
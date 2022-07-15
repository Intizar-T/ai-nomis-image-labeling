import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const RenderImage = ({ URL }) => {
    const [image] = useImage(URL);
    return <Image image={image} />;
};

export default RenderImage;
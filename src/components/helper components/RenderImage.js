import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const RenderImage = (props) => {
    const [image] = useImage(props.state.files[props.state.currentFileIndex][1]);
    return <Image image={image} />;
};

export default RenderImage;
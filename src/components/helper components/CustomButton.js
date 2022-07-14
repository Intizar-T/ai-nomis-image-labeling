import React from 'react';
import { useContext } from "react";
import { Context } from "../context/context";
import DownloadText from "../download/DownloadText";
import ProcessImages from "../helper functions/ProcessImages";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "./Rectangle"
import DownloadImage from "../download/DownloadImage";
import { Grid, Button } from '@mui/material';

const CustomButton = (props) => {
    const { state, dispatch } = useContext(Context);
    return(
        <Button 
            variant='contained' 
            component="label"
            onClick={(e) => {
                if(state.popup || state.labelPrompt){
                    state.popup ? 
                    alert("Please, choose a label!") :
                    alert("Please, provide the number of classes");
                }
                else {
                    if(props.pass_state){
                        props.action(state);
                    }
                    else if(props.pass_dispatch){
                        dispatch(props.dispatch_info);
                    }
                    else{
                        props.action();
                    }
                }
            }}
            style={props.style}
        >
            {props.text}
        </Button>

    );
}

export default CustomButton;
import React from 'react';
import { useContext } from "react";
import { Context } from "../context/context";
import DownloadText from "../download/DownloadText";
import ProcessImages from "../helper functions/ProcessImages";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "../helper components/Rectangle"
import DownloadImage from "../download/DownloadImage";
import { Grid, Button } from '@mui/material';
import CustomButton from '../helper components/CustomButton';
import "../../styles/app/app.css";

const Footer = (props) => {
    const { state, dispatch } = useContext(Context);
    return(
       state.files.length > 0 ? (
            <Grid 
                container 
                justify="space-between" 
                spacing={2}
                style={{
                    height: 50,
                    width: "100%",
                }}
            >
                <Grid 
                    item
                    xs={6}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={2}
                    style={{
                        height: "100%",
                        paddingLeft: 30,
                    }}
                >
                    <CustomButton action={props.handleExport} text="Download" style={{ height: 50, fontSize: 20, }}/>
                    <CustomButton action={DownloadText} text="Download .txt" pass_state={true} style={{ marginLeft: 10, height: 50, fontSize: 20, }}/>
                </Grid>

                <Grid 
                    item
                    xs={6}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <CustomButton 
                        action={() => {}} 
                        text="+" 
                        style={{ marginLeft: 5, height: 30, fontSize: 14, }}
                    />
                    <CustomButton 
                        action={() => {}} 
                        text="PREV" 
                        pass_dispatch={true} 
                        dispatch_info={{type: "PREV_FILE"}} 
                        style={{ marginLeft: 5, height: 40, fontSize: 18, }}
                    />
                     <CustomButton 
                        action={() => {}} 
                        text="UNDO" 
                        style={{ marginLeft: 5, height: 50, fontSize: 20, }}
                    />
                    <CustomButton 
                        action={() => {}} 
                        text="NEXT" 
                        pass_dispatch={true} 
                        dispatch_info={{type: "NEXT_FILE"}} 
                        style={{ marginLeft: 5, height: 40, fontSize: 18, }}
                    />
                    <CustomButton 
                        action={() => {}} 
                        text="-" 
                        style={{ marginLeft: 5, height: 30, fontSize: 14, }}
                    />
                </Grid>
            </Grid>
            ) : (
                <Grid 
                    item 
                    xs={12} 
                    direction="row" 
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        display: "grid",
                    }}
                >
                    <Button 
                        variant='contained' 
                        component="label"
                        style={{ height: 50, fontSize: 20, margin: "auto", }}
                    >
                        Upload Images
                        <input
                            hidden
                            onChange={(e) => {
                                ProcessImages(state, dispatch, e.target.files);
                            }}
                            accept=".zip,.rar,.7zip"
                            type="file"
                        />
                    </Button>
                </Grid>
            )
    );
}

export default Footer;
import React from 'react';
import { useContext } from "react";
import { Context } from "../context/context";
import DownloadText from "../download/DownloadText";
import ProcessImages from "../helper functions/ProcessImages";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "../helper components/Rectangle"
import DownloadImage from "../download/DownloadImage";

const Footer = (props) => {
    const { state, dispatch } = useContext(Context);
    return(
        <footer className="footer">
            {state.files.length > 0 ? (

                /* Download button */
                <div className="download__btns">
                    <button 
                        className="download" 
                        onClick={(e) => {
                            if(state.popup || state.labelPrompt){
                                state.popup ? 
                                alert("Please, choose a label!") :
                                alert("Please, provide the number of classes");
                            }
                            else {
                                props.handleExport();
                            }
                        }}>
                        Download
                    </button>

                    {/* Download text button */}
                    <button 
                        className="download txt" 
                        onClick={(e) => {
                            if(state.popup || state.labelPrompt){
                                state.popup ? 
                                alert("Please, choose a label!") :
                                alert("Please, provide the number of classes");
                            }
                            else {
                                DownloadText(state);
                            }
                        }}>
                        Download .txt
                    </button>
                </div>
            ) : (
                <form>
                    <label className="upload" htmlFor="fileInput">Upload Images</label>
                    <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        className="upload__button"
                        accept=".zip,.rar,.7zip"
                        onChange={(e) => {
                            ProcessImages(state, dispatch, e.target.files);
                        }}
                    />
                </form>
            )}
            <div className="zooms">
                {/* Zoom in button (hasn't been implemented yet) */}
                <button
                    onClick={() => {
                        if(state.popup || state.labelPrompt){
                            state.popup ? 
                            alert("Please, choose a label!") :
                            alert("Please, provide the number of classes");
                        }
                        else {
                            // zoomIn here
                        }
                        
                    }}
                    className="zoom__in zoom"
                >
                    +
                </button>

                {/* Zoom out button (hasn't been implemented yet) */}
                <button
                    onClick={() => {
                        if(state.popup || state.labelPrompt){
                            state.popup ? 
                            alert("Please, choose a label!") :
                            alert("Please, provide the number of classes");
                        }
                        else {
                            //zoomOut here
                        }
                    }}
                    className="zoom__out zoom"
                >
                    -
                </button>

                {/* Prev image button */}
                <button
                    onClick={() => {
                        if(state.popup || state.labelPrompt){
                            state.popup ? 
                            alert("Please, choose a label!") :
                            alert("Please, provide the number of classes");
                        }
                        else {
                            dispatch({ type: "PREV_FILE" });
                        }
                    }}
                    className="prev__image"
                >
                    Prev
                </button>

                {/* Next image button */}
                <button
                    onClick={() => {
                        if(state.popup || state.labelPrompt){
                            state.popup ? 
                            alert("Please, choose a label!") :
                            alert("Please, provide the number of classes");
                        }
                        else {
                            dispatch({ type: "NEXT_FILE" });
                        }
                    }}
                    className="next__image"
                >
                    Next
                </button>

                {/* Undo button */}
                <button
                    className="undo"
                    onClick={() => {
                        if(state.popup || state.labelPrompt){
                            state.popup ? 
                            alert("Please, choose a label!") :
                            alert("Please, provide the number of classes");
                        }
                        else {
                            //utils.undo(true);
                        }
                        
                    }}
                >
                    Undo
                </button>
            </div>
        </footer>
    );
}

export default Footer;
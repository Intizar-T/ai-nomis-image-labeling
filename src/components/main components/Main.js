import React from 'react';
import { useContext } from "react";
import Popup from "../helper components/Popup";
import Labels from "../helper components/Labels";
import "../../styles/app/app.css";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "../helper components/Rectangle"
import RenderImage from "../helper components/RenderImage";
import { Context } from "../context/context";

const Main = (props) => {
    const { state, dispatch } = useContext(Context);
  	const [selectedId, selectShape] = React.useState(null);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const checkDeselect = (e) => {
		// deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
		  selectShape(null);
		}
	};

    const updateHistory = () => {
        const curr_index = state.currentFileIndex;
        const rects = state.rectangles;
        const new_hist = {
            x: rects[curr_index].x,
            y: rects[curr_index].y,
            width: rects[curr_index].width,
            height: rects[curr_index].height,
        }
        rects[curr_index].hist.push(new_hist);

        dispatch({ type: "UPDATE_RECTS", rects: rects });
    }

    return(
        <main id="main">
            {/* Guide message: */}
            {state.files.length === 0 ? (
                <p className="guide__message">
                    <br />
                    <h3>
                        In order to upload your images, please, first zip them into 
                        either of these formats: .zip | .rar | .7zip
                        <br /><br />
                        And the allowed image formats are: .jpg | .png | .gif 
                        | .ps | .jpeg | .webp
                    </h3>
                </p>
            ) : (
                <Stage
                    width={window.innerWidth - 200}
                    height={window.innerHeight - 250}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                    ref={props.stageRef}
                    style={{
                        margin: 10,
                    }}
                >
                    <Layer id="layer">
                        <RenderImage URL={state.files[state.currentFileIndex][1]}/>
                            <Rectangle
                                key={state.rectangles[state.currentFileIndex].id}
                                shapeProps={state.rectangles[state.currentFileIndex]}
                                isSelected={state.rectangles[state.currentFileIndex].id === selectedId}
                                onSelect={() => {
                                    selectShape(state.rectangles[state.currentFileIndex].id);
                                }}
                                onChange={(newAttrs) => {
                                    updateHistory();
                                    const rects = state.rectangles.slice();
                                    rects[state.rectangles[state.currentFileIndex].id] = newAttrs;
                                    dispatch({ type: "UPDATE_RECTS", rects });
                                }}
                            />
                            {state.labelPrompt && 
                            <Html
                                divProps={{
                                    style: {
                                        width: "100%", /* Can be in percentage also. */
                                        height: "100%",
                                    }
                                }}	
                            >
                                <Labels dispatch={dispatch}/>
                            </Html>
                            }

                            {state.popup && 
                            <Html
                                divProps={{
                                    style: {
                                        width: "100%", /* Can be in percentage also. */
                                        height: "100%",
                                    }
                                }}	
                            >
                                <Popup
                                    state={state} 
                                    dispatch={dispatch}
                                />
                            </Html>
                            }
                        
                    </Layer>
                </Stage>
            )}
        </main>
    );
}

export default Main;
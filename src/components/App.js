import React, { useMemo, useEffect, useContext, useState } from "react";
import Popup from "./Popup";
import { Context } from "./context/context";
import Utils from "./Utils";
import Labels from "./Labels";
import "../styles/app/app.css";
import { Stage, Layer } from 'react-konva';
import Rectangle from "./Rectangle"
import RenderImage from "./RenderImage";
import ProcessImages from "./ProcessImages";

export default function App() {
	const { state, dispatch } = useContext(Context);
	const [currentBox, setCurrentBox] = useState([]);
	//const [rectangles, setRectangles] = React.useState(state.initialRectangles);
  	const [selectedId, selectShape] = React.useState(null);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const utils = useMemo(() => new Utils(state, dispatch), [state]);
	
	const checkDeselect = (e) => {
		// deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
		  selectShape(null);
		}
	  };
/* 	if(state.files.length > 0){
		const currImgId = state.currentFileIndex;
		const currRectId = state.rectangles[state.currentFileIndex].id;
	}  */ 	
	
	return (
		<div className="app__container">
			<div className="header">
				<p className="welcome__message"><h2>
					Welcome to the Object Detection platform!
				</h2></p>
				
			</div>
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
					>
						<Layer>
							<RenderImage state={state}/>
							{/* {rectangles.map((rect, i) => {
								return ( */}
								<Rectangle
									key={state.rectangles[state.currentFileIndex].id}
									shapeProps={state.rectangles[state.currentFileIndex]}
									isSelected={state.rectangles[state.currentFileIndex].id === selectedId}
									onSelect={() => {
										selectShape(state.rectangles[state.currentFileIndex].id);
									}}
									onChange={(newAttrs) => {
										const rects = state.rectangles.slice();
										rects[state.rectangles[state.currentFileIndex].id] = newAttrs;
										//setRectangles(rects);
										dispatch({ type: "UPDATE_RECTS", rects });
									}}
								/>
								{/* );
							})} */}
						</Layer>
					</Stage>
				)}

				{/* Various pop ups */}
				<div className="input__container" id="input">
					<input
						id="fileInput"
						type="file"
						style={{ display: "none" }}
						className="input__upload__pic"
						accept=".zip,.rar,.7zip"
						onChange={(e) => {
							ProcessImages(state, dispatch, e.target.files);
						}}
					/>
					<canvas id="canvas"></canvas>
					{state.labelPrompt && <Labels />}
					{state.popup && <Popup currentBox={currentBox} />}
				</div>

				{/* Footer buttons (Upload, +, -, Prev, Next, Undo) */}
				<div className="footer">
					{state.files.length > 0 ? (
						<div className="download__btns">
							<button className="download" onClick={(e) => utils.download(e)}>
								Download
							</button>
							<button className="download txt" onClick={(e) => utils.downloadTextFile()}>
								Download .txt
							</button>
						</div>
					) : (
						<label className="upload" htmlFor="fileInput">
							<p className="upload__button" onClick={() => {}}>
								Upload Image
							</p>
						</label>
					)}
					<div className="zooms">
						{/* Zoom in button (hasn't been implemented yet) */}
						<button
							onClick={() => {
								// zoomInOut(true);
							}}
							className="zoom__in zoom"
						>
							+
						</button>

						{/* Zoom out button (hasn't been implemented yet) */}
						<button
							onClick={() => {
								// zoomInOut(false);
							}}
							className="zoom__out zoom"
						>
							-
						</button>

						{/* Prev image button */}
						<button
							onClick={() => {dispatch({ type: "PREV_FILE" });}}
							className="prev__image"
						>
							Prev
						</button>

						{/* Next image button */}
						<button
							onClick={() => {dispatch({ type: "NEXT_FILE" });}}
							className="next__image"
						>
							Next
						</button>

						{/* Undo button */}
						<button
							className="undo"
							onClick={() => {
								utils.undo(true);
							}}
						>
							Undo
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

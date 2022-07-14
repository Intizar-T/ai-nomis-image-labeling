import React, { useMemo, useEffect, useContext, useState } from "react";
import Popup from "./Popup";
import { Context } from "./context/context";
import Labels from "./Labels";
import "../styles/app/app.css";
import { Stage, Layer } from 'react-konva';
import { Html } from 'react-konva-utils'
import Rectangle from "./Rectangle"
import RenderImage from "./RenderImage";
import ProcessImages from "./ProcessImages";
import DownloadImage from "./Download/DownloadImage";
import DownloadText from "./Download/DownloadText";
import "../styles/labels/labels.css";

export default function App() {
	const { state, dispatch } = useContext(Context);
	const [currentBox, setCurrentBox] = useState([]);
  	const [selectedId, selectShape] = React.useState(null);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const checkDeselect = (e) => {
		// deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
		  selectShape(null);
		}
	};

	const stageRef = React.useRef(null);
  	const handleExport = () => {
		const uri = stageRef.current.toDataURL();
		DownloadImage(state, uri);
  	};

	useEffect(() => {
		if(state.files.length > 0 && !state.labelPrompt) {
			//console.log(state.currentFileIndex);
			if(state.rectangles[state.currentFileIndex].label === "not labeled"){
				dispatch({ type: "SET_POPUP", popup: true });
			}
		}
	}, [state]);
	
	
	return (
		<div className="app__container">
			<header className="header">
				<p className="welcome__message"><h2>
					Welcome to the Object Detection platform!
				</h2></p>
				
			</header>
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
						ref={stageRef}
						style={{
							margin: 10,
						}}
					>
						<Layer id="layer">
							<RenderImage state={state}/>
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
	
			{/* Footer buttons (Upload, +, -, Prev, Next, Undo) */}
			<footer className="footer">
					{state.files.length > 0 ? (
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
										handleExport();
									}
								}}>
								Download
							</button>
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
		</div>
	);
}

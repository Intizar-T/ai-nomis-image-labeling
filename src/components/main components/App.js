import React, { useEffect, useContext } from "react";
import { Context } from "../context/context";
import "../../styles/app/app.css";
import DownloadImage from "../download/DownloadImage";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";

export default function App() {
	const { state, dispatch } = useContext(Context);

	const stageRef = React.useRef(null);
  	const handleExport = () => {
		const uri = stageRef.current.toDataURL();
		DownloadImage(state, uri);
  	};

	useEffect(() => {
		if(state.files.length > 0 && !state.labelPrompt) {

			if(state.rectangles[state.currentFileIndex].label === "not labeled"){
				dispatch({ type: "SET_POPUP", popup: true });
			}
		}
	}, [state]);
	
	
	return (
		<Grid direction="column" className="app__container">
			<Header />
			<Main stageRef={stageRef}/>
			<Footer handleExport={handleExport} />
		</Grid>
	);
}

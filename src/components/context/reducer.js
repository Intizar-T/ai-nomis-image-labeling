// a Reducer funtion that's utilized within the Context to update the state

const colors = shuffle([
	"IndianRed",
	"LightCoral",
	"Salmon",
	"DarkSalmon",
	"LightSalmon",
	"Crimson",
	"Red",
	"FireBrick",
	"DarkRed",
	"Pink",
	"LightPink",
	"HotPink",
	"DeepPink",
	"MediumVioletRed",
	"PaleVioletRed",
	"LightSalmon",
	"Coral",
	"Tomato",
	"OrangeRed",
	"DarkOrange",
	"Orange",
	"Gold",
	"Yellow",
	"LightYellow",
	"LemonChiffon",
	"LightGoldenrodYellow",
	"PapayaWhip",
	"Moccasin",
	"PeachPuff",
	"PaleGoldenrod",
	"Khaki",
	"DarkKhaki",
	"Lavender",
	"Thistle",
	"Plum",
	"Violet",
	"Orchid",
	"Fuchsia",
	"Magenta",
	"MediumOrchid",
	"MediumPurple",
	"RebeccaPurple",
	"BlueViolet",
	"DarkViolet",
	"DarkOrchid",
	"DarkMagenta",
	"Purple",
	"Indigo",
	"SlateBlue",
	"DarkSlateBlue",
	"MediumSlateBlue",
	"GreenYellow",
	"Chartreuse",
	"LawnGreen",
	"Lime",
	"LimeGreen",
	"PaleGreen",
	"LightGreen",
	"MediumSpringGreen",
	"SpringGreen",
	"MediumSeaGreen",
	"SeaGreen",
	"ForestGreen",
	"Green",
	"DarkGreen",
	"YellowGreen",
	"OliveDrab",
	"Olive",
	"DarkOliveGreen",
	"MediumAquamarine",
	"DarkSeaGreen",
	"LightSeaGreen",
	"DarkCyan",
	"Teal",
	"Aqua",
	"Cyan",
	"LightCyan",
	"PaleTurquoise",
	"Aquamarine",
	"Turquoise",
	"MediumTurquoise",
	"DarkTurquoise",
	"CadetBlue",
	"SteelBlue",
	"LightSteelBlue",
	"PowderBlue",
	"LightBlue",
	"SkyBlue",
	"LightSkyBlue",
	"DeepSkyBlue",
	"DodgerBlue",
	"CornflowerBlue",
	"MediumSlateBlue",
	"RoyalBlue",
	"Blue",
	"MediumBlue",
	"DarkBlue",
	"Navy",
	"MidnightBlue",
	"Cornsilk",
	"BlanchedAlmond",
	"Bisque",
	"NavajoWhite",
	"Wheat",
	"BurlyWood",
	"Tan",
	"RosyBrown",
	"SandyBrown",
	"Goldenrod",
	"DarkGoldenrod",
	"Peru",
	"Chocolate",
	"SaddleBrown",
	"Sienna",
	"Brown",
	"Maroon",
	"White",
	"Snow",
	"HoneyDew",
	"MintCream",
	"Azure",
	"AliceBlue",
	"GhostWhite",
	"WhiteSmoke",
	"SeaShell",
	"Beige",
	"OldLace",
	"FloralWhite",
	"Ivory",
	"AntiqueWhite",
	"Linen",
	"LavenderBlush",
	"MistyRose",
	"Gainsboro",
	"LightGray",
	"Silver",
	"DarkGray",
	"Gray",
	"DimGray",
	"LightSlateGray",
	"SlateGray",
	"DarkSlateGray",
	"Black",
]);

const Reducer = (state, action) => {
	switch (action.type) {
		case "SET_BOX_LABEL":
			return {
				...state,
				rectangles: action.rects,
			}
		case "SET_LABELPROMPT":
			return {
				...state,
				labelPrompt: action.label,
			};
		case "INIT_LABELS":
			return {
				...state,
				colors: colors.slice(0, action.length),
			};
		case "INIT_BOXES":
			const obj = {};
			for (let i = 0; i < action.length; i++) {
				obj[i] = [];
			}
			return {
				...state,
				boxes: obj,
			};
		case "INIT_RECTS":
			const rects = [];
			const hist = [];
			for(let i = 0; i < action.length; i++) {
				rects.push({
					x: 10,
					y: 10, 
					width: 100,
					height: 100, 
					id: i.toString(),
					label: "not labeled",
					stroke: 'black',
					strokeWidth: 4,
					hist: [
						{
							x: 10,
							y: 10, 
							width: 100,
							height: 100,
						}
					]
				})
			}
			return {
				...state,
				rectangles: rects,
			};
		case "UPDATE_RECTS":
			return {
				...state,
				rectangles: action.rects,
			};
		/* case "UPDATE_RECT":	//after changing the history / pressing the UNDO button
			return {
				...state,
				rectangles
			} */
		case "SET_MOUSE":
			return {
				...state,
				mouseX: action.mouseX,
				mouseY: action.mouseY,
			};
		case "SET_POPUP":
			return {
				...state,
				popup: action.popup,
			};
		case "SET_START":
			return {
				...state,
				startX: action.startX,
				startY: action.startY,
			};
		case "SET_FILES":
			return {
				...state,
				files: action.files,
			};
		case "SET_CLICKED_AREA":
			return {
				...state,
				clickedArea: action.clickedArea,
			};
		case "SET_CURRENT_FILE_INDEX":
			return {
				...state,
				currentFileIndex: 0,
			};
		case "ADD_BOX":
			const b = state.boxes[action.index];
			let c = JSON.stringify(b).indexOf(JSON.stringify(action.box));

			if (c === -1) {
				b.push(action.box);
			}

			return {
				...state,
				boxes: { ...state.boxes, currentFileIndex: b },
			};
		case "SET_TMP_BOX":
			return {
				...state,
				tmpBox: action.tmpBox,
			};
		case "POP_BOX":
			const temp_arr = state.boxes[action.index];
			if (temp_arr.length > 0) {
				temp_arr.pop();
			}
			return {
				...state,
				boxes: [...state.boxes, temp_arr],
			};
		case "SET_BOXES":
			return {
				...state,
				boxes: { ...state.boxes, currentFileIndex: action.boxes },
			};
		case "SET_DRAWING":
			return {
				...state,
				isDrawing: action.isDrawing,
			};
		case "SET_BOXDRAWN":
			return {
				...state,
				boxDrawn: action.boxDrawn,
			};
		case "SET_MOUSEMOVE":
			return {
				...state,
				didMouseMove: action.didMouseMove,
			};
		case "SET_ORIGINAL_IMAGE_SIZE":
			return {
				...state,
				originalImageSize: action.size,
			};
		case "SET_CURRENT_IMAGE_SIZE":
			return {
				...state,
				currentImageSize: action.size,
			};
		case "NEXT_FILE":
			return {
				...state,
				currentFileIndex:
					state.currentFileIndex < state.files.length - 1
						? state.currentFileIndex + 1
						: state.currentFileIndex,
			};
		case "PREV_FILE":
			return {
				...state,
				currentFileIndex:
					state.currentFileIndex > 0 ? state.currentFileIndex - 1 : state.currentFileIndex,
			};
		case "CHANGE_FILE":
			const arr = state.files;
			arr[action.index] = [state.files[action.index][0], action.file];
			return {
				...state,
				files: arr,
			};
		case "LABEL_IMAGES":
			state.boxedImages.push(action.lbl_img);
			return {
				...state,
			}
		default:
			return state;
	}
};

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export default Reducer;

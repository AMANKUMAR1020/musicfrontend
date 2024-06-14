//import { BsSoundwave } from "react-icons/bs";
import "./music.css"

export const convertToMins = (value) => {
	const mins = Math.floor(value / 60);
	const secs = Math.round(value - mins * 60, 2);
	const formattedSeconds = secs < 10 ? "0" + secs : secs;
	return `${mins}:${formattedSeconds}`;
};

export const truncateText = (text, length) => {
	if (text.length > length) {
		return text.slice(0, length) + "...";
	} else return text;
};

const PlayingBar = ({ time, track, onSeek, trackRef }) => {
	return (
		<div class="track-range">
		
			<p class="text">{trackRef ? convertToMins(trackRef.currentTime) : "0:00"}</p>

			<input 
			class="range"
			type="range"
			value={!isNaN(time) ? time : 0}
			onChange={onSeek}
			/>
			<p class="text">{trackRef?.duration ? convertToMins(trackRef.duration) : "NaN"}</p>
		</div>
	);
};

export default PlayingBar;


















// //import { BsSoundwave } from "react-icons/bs";
// import "./music.css"

// export const convertToMins = (value) => {
// 	const mins = Math.floor(value / 60);
// 	const secs = Math.round(value - mins * 60, 2);
// 	const formattedSeconds = secs < 10 ? "0" + secs : secs;
// 	return `${mins}:${formattedSeconds}`;
// };

// export const truncateText = (text, length) => {
// 	if (text.length > length) {
// 		return text.slice(0, length) + "...";
// 	} else return text;
// };

// const PlayingBar = ({ time, track, onSeek, trackRef }) => {
// 	return (
// 		<div class="track-range">
		
// 			<p class="text">{trackRef ? convertToMins(trackRef.currentTime) : "0:00"}</p>
		
// 			<input class="range" type="range" value={!isNaN(time) ? time : 0}  onChange={onSeek} />
		
// 			<p class="text">{track?.duration ? track?.duration : "NaN"}</p>
// 		</div>
// 	);
// };

// export default PlayingBar;














// //import { BsSoundwave } from "react-icons/bs";
// import "./music.css"

// export const convertToMins = (value) => {
// 	const mins = Math.floor(value / 60);
// 	const secs = Math.round(value - mins * 60, 2);
// 	const formattedSeconds = secs < 10 ? "0" + secs : secs;
// 	return `${mins}:${formattedSeconds}`;
// };

// export const truncateText = (text, length) => {
// 	if (text.length > length) {
// 		return text.slice(0, length) + "...";
// 	} else return text;
// };

// const PlayingBar = ({ time, track, onSeek, trackRef }) => {
// 	return (
// 		<div class="track-range">
		
// 			<p class="text">{trackRef ? convertToMins(trackRef.currentTime) : "0:00"}</p>
		
// 			<input class="range" type="range" value={!isNaN(time) ? time : 0}  onChange={onSeek} />
		
// 			<p class="text">{track?.duration ? track?.duration : "NaN"}</p>
// 		</div>
// 	);
// };

// export default PlayingBar;

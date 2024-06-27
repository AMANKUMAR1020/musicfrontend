import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import "./music.css"
import { useState } from "react";

const VolumeControl = ({ onToggle, onChange, volume }) => {
		
	return (
		<div class="vol-title">
			<button className="btn-type6" onClick={onToggle} >{volume === 0 ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}</button>
			<input type="range" value={volume ? volume * 100 : 0} onChange={onChange}/>
		</div>
	);
};

export default VolumeControl;














// import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
// import "./music.css"

// const VolumeControl = ({ onToggle, onChange, volume }) => {
// 	return (
// 		<div class="title">
// 			<button className="btn-type5" onClick={onToggle} >{volume === 0 ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}</button>
// 			{/* <input type="range" value={volume ? volume * 100 : 0} onChange={onChange}/> */}
// 		</div>
// 	);
// };

// export default VolumeControl;


import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import "./music.css"

const VolumeControl = ({ onToggle, onChange, volume }) => {
	return (
		<div class="title">
			<button onClick={onToggle} >{volume === 0 ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}</button>
			{/* <input type="range" value={volume ? volume * 100 : 0} onChange={onChange}/> */}
		</div>
	);
};

export default VolumeControl;


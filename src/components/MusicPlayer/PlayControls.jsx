//import { Button, Flex, Hide } from "@chakra-ui/react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import {
	TbArrowsShuffle,
	TbPlayerTrackNextFilled,
	TbPlayerTrackPrevFilled,
	TbRepeat,
	TbRepeatOff,
	TbRepeatOnce,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toggleRepeat } from "../../redux/slices/playerSlice";
import "./music.css"

const PlayControls = ({
	onNext,
	onPrevious,
	onPlay,
	isPlaying,
	repeatStatus,
}) => {
	const dispatch = useDispatch();

//	const repeatStatus = "OFF";

	return (
		<div class="track-button">
			<button className="btn-type6" ><TbArrowsShuffle /></button>

			<button className="btn-type6" onClick={onPrevious}> <TbPlayerTrackPrevFilled/></button>
			
			<button className="btn-type6" onClick={onPlay}> {!isPlaying ? <AiFillPlayCircle /> : <AiFillPauseCircle />}</button>
			
			<button className="btn-type6" onClick={onNext}> <TbPlayerTrackNextFilled size={16} /></button>
			
			<button className="btn-type6" onClick={() => dispatch(toggleRepeat())}>
				{repeatStatus === "OFF" ? (
						<TbRepeatOff color="inherit" size={18} />
					) : repeatStatus === "SINGLE" ? (
						<TbRepeatOnce color="inherit" size={18} />
					) : (
						<TbRepeat color="inherit" size={18} />
					)}
			</button>
		</div>
	);
};

export default PlayControls;


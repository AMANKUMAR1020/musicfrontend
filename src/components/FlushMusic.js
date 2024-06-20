import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, setPlaying } from "../redux/slices/playerSlice";

const FlushMusic = async () => {
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  if (currentTrack) {
    await dispatch(setCurrentTrack(null));
  }

  if (isPlaying) {
    await dispatch(setPlaying(false));
}

};

export default FlushMusic;

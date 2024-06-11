import "./music.css"
const TrackDetails = ({ track }) => {
	return (
		<div class="title">
			<img src={track?.coverImage} alt={track?.title}	width="100px" height="100px" />
			<p class="text">{track?.title}</p>
			<p class="text">{track?.Artiste}</p>
		</div>
	);
};

export default TrackDetails;


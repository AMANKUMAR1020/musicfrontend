import "./music.css"
const TrackDetails = ({ track }) => {
	return (
		<div class="title">
			<img src={track?.coverImage} alt={track?.title}	width="150px" height="150px" />
			<p class="text">{track?.title}</p>
			<p class="text">Song Artiste</p>
		</div>
	);
};

export default TrackDetails;


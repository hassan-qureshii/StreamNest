import PlayVideo from "../../Components/Play/Play";
import Recommended from "../../Components/Recommended/Recommended";
import { useParams } from "react-router-dom";
import "./Video.css";

const Video = () => {
  const { categoryId, videoId } = useParams(); // order matches /video/:categoryId/:videoId

  return (
    <div className="play-container">
      <PlayVideo videoID={videoId} categoryID={categoryId} />
      <Recommended category={categoryId} />
    </div>
  );
};

export default Video;

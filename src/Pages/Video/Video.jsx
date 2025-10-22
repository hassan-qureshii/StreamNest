import Playvideo from '../../Components/Playvideo/Playvideo';
import Recommended from "../../Components/Recommended/Recommended";
import { useParams } from "react-router-dom";
import "./Video.css";

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      <Playvideo videoID={videoId} />        {/* match component import */}
      <Recommended category={categoryId} />  {/* prop name should match Recommended component */}
    </div>
  );
};

export default Video;

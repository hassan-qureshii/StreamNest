import PlayVideo from '../../Components/PlayVideo/Playvideo';
import Recommended from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';
import './Video.css';

const Video = () => {
  const { videoId, categoryId} = useParams();
  return (
    <div className='play-container'>
      <PlayVideo videoID={videoId} />
      <Recommended categoryID={categoryId}/>
    </div>
  );
};

export default Video;
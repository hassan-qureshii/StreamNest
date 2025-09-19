import { useState, useEffect } from 'react';
import { API_KEY } from '../../Data';
import './Recommended.css';
import {Link} from 'react-router-dom'
import { VscLoading } from 'react-icons/vsc';

const Recommended = ({ categoryID }) => {
  const [recommendedData, setRecommendedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendedVideoData = async () => {
    try {
      setLoading(true);
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=PK&videoCategoryId=${categoryID}&maxResults=10&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setRecommendedData(data.items || []);
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedVideoData();
  }, [categoryID]);

  return (
    <div className="recommended">
      {loading ? (
       <VscLoading />
      ) : (
        recommendedData.map((video, index) => (
          <Link to={`/video/${video.snippet.categoryId}/${video.id}`} className="side-video-list" key={index}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="thumbnail"
            />
            <div className="vid-info">
              <h4>{video.snippet.title}</h4>
              <p>{video.snippet.channelTitle}</p>
              <p>{video.statistics.viewCount} Views</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Recommended;

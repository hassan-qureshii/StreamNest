import React, { useEffect, useState } from "react";
import "./Recommended.css"; // 👈 we'll add styles here

const API_KEY = "AIzaSyBha8aao2fPf08vFiWNcRMBAWCJiKGnO28"; // Replace with your valid key
const REGION_CODE = "US";

const Recommended = ({ category }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecommendedVideoData = async () => {
    try {
      setLoading(true);
      setError(null);

      const categoryParam = category ? `&videoCategoryId=${category}` : "";

      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${REGION_CODE}${categoryParam}&maxResults=10&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch videos");
      }

      setVideos(data.items || []);
    } catch (err) {
      console.error("❌ Error fetching videos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedVideoData();
  }, [category]);

  if (loading) {
    return <p style={{ color: "#333" }}>⏳ Loading recommended videos...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>⚠️ Error: {error}</p>;
  }

  return (
    <div className="recommended-container">
      <h2>🎥 Recommended Videos</h2>
      <div className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="video-item"
              onClick={() =>
                window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank")
              }
            >
              <div className="video-thumbnail">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
              </div>
              <div className="video-info">
                <h4>{video.snippet.title}</h4>
                <p>{video.snippet.channelTitle}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No recommended videos found.</p>
        )}
      </div>
    </div>
  );
};

export default Recommended;

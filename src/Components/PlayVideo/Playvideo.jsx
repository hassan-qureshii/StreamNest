import { GrShare, GrDownload } from 'react-icons/gr';
import {BiLike, BiDislike } from 'react-icons/bi';
import { Avatar } from 'antd';
import './PlayVideo.css';
import { API_KEY } from '../../Data';
import { useEffect, useState } from 'react';
const Playvideo = ({videoID}) => {
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Fetch Video Data
  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoID}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    setVideoData(data.items[0]);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoID]);

  // Fetch Channel + Comment Data
  const fetchOtherData = async () => {
    if (!videoData) return;

    const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${videoData.snippet.channelId}&key=${API_KEY}`;
    const channelRes = await fetch(channelDetails_url);
    const channelData = await channelRes.json();
    setChannelData(channelData.items[0]);

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoID}&key=${API_KEY}`;
    const commentRes = await fetch(comment_url);
    const commentData = await commentRes.json();
    setCommentData(commentData.items || []);
  };

  useEffect(() => {
    fetchOtherData();
  }, [videoData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="video-player"
        title="YouTube video"
      ></iframe>

      <h3>{videoData ? videoData.snippet.title : 'title here'}</h3>

      <div className="play-video-info">
        {videoData ? videoData.statistics.viewCount : 'Views'} Views &bull;{' '}
        {videoData ? videoData.snippet.publishedAt : 'Date'}

        <div>
          <span>
            <BiLike className="icons" />
            {videoData ? videoData.statistics.likeCount : 0}
          </span>
          <span>
            <BiDislike className="icons" />
            2
          </span>
          <span>
            <GrShare className="icons" />
            4
          </span>
          <span>
            <GrDownload className="icons" />
            6
          </span>
        </div>
      </div>
      <hr />

      <div className="publisher">
        <Avatar
          className="avatar"
          size={64}
          src={channelData ? channelData.snippet.thumbnails.default.url : ''}
          alt="Channel Avatar"
        />
        <div>
          <p>{videoData ? videoData.snippet.channelTitle : 'Channel Name'}</p>
          <span>{channelData ? channelData.statistics.subscriberCount : ''} Subscribers</span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{videoData ? videoData.snippet.description.slice(0, 250) : ''}</p>
        <hr />
        <h4>{videoData ? videoData.statistics.commentCount : 'No Comment'} Comments</h4>

        {commentData.length > 0 ? (
          commentData.map((item, index) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
              <div className="comment" key={index}>
                <Avatar className="avatar" size={40} src={comment.authorProfileImageUrl} />
                <div>
                  <h3>
                    {comment.authorDisplayName}
                    <span> {new Date(comment.publishedAt).toDateString()}</span>
                  </h3>
                  <p>{comment.textDisplay}</p>
                  <div className="comment-actions">
                    <BiLike className="icon" />
                    <span>{comment.likeCount}</span>
                    <BiDislike className="icon" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>....</p>
        )}
      </div>
    </div>
  );
};

export default Playvideo;

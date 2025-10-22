import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineShareAlt,
  AiOutlineDownload,
} from "react-icons/ai";
import { MdPlaylistAdd, MdOutlineMoreVert } from "react-icons/md";
import { Avatar, Tooltip, message, notification } from "antd";
import { useEffect, useState } from "react";
import "./Play.css";
import { API_KEY } from "../../Data";
import Recommended from "../Recommended/Recommended";

const PlayVideo = ({ videoID, categoryID }) => {
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [visibleComments, setVisibleComments] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ Resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Format large numbers to K/M
  const formatCount = (num) => {
    if (!num) return "0";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  // ✅ Fetch Video Data
  const fetchVideoData = async () => {
    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoID}&key=${API_KEY}`
      );
      const data = await res.json();
      if (data.items?.length > 0) setVideoData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // ✅ Fetch Channel & Comments
  const fetchOtherData = async () => {
    if (!videoData) return;
    try {
      const channelRes = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${videoData.snippet.channelId}&key=${API_KEY}`
      );
      const channelJson = await channelRes.json();
      setChannelData(channelJson.items?.[0]);

      const commentRes = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoID}&key=${API_KEY}`
      );
      const commentJson = await commentRes.json();
      setCommentData(commentJson.items || []);
    } catch (error) {
      console.error("Error fetching channel/comment data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoID]);

  useEffect(() => {
    fetchOtherData();
  }, [videoData]);

  // ✅ Handlers
  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("Video link copied!");
    } catch {
      message.error("Failed to copy link!");
    }
  };

  const handleDownload = () => {
    message.info("Download feature coming soon!");
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    if (!subscribed) {
      notification.success({
        message: "Subscription Successful 🎉",
        description: "You subscribed to this channel successfully!",
        placement: "topRight",
      });
    } else {
      notification.info({
        message: "Unsubscribed",
        description: "You unsubscribed from this channel.",
        placement: "topRight",
      });
    }
  };

  const showMoreComments = () => {
    if (visibleComments < commentData.length) {
      setVisibleComments((prev) => prev + 2);
    } else {
      setVisibleComments(2); // Hide comments back
    }
  };

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="video-player"
        title={videoData?.snippet?.title || "YouTube video"}
      ></iframe>

      <h3>{videoData ? videoData.snippet.title : "Loading video..."}</h3>

      <div className="play-video-info">
        <span>
          {videoData
            ? `${formatCount(videoData.statistics.viewCount)} views`
            : "Loading..."}{" "}
          •{" "}
          {videoData
            ? new Date(videoData.snippet.publishedAt).toDateString()
            : ""}
        </span>

        <div className="action-icons">
          <Tooltip title="Like">
            <span
              onClick={handleLike}
              className={`icon-btn ${liked ? "active" : ""}`}
            >
              <AiOutlineLike className="icons" />
              {videoData ? formatCount(videoData.statistics.likeCount) : 0}
            </span>
          </Tooltip>

          <Tooltip title="Dislike">
            <span
              onClick={handleDislike}
              className={`icon-btn ${disliked ? "active" : ""}`}
            >
              <AiOutlineDislike className="icons" />
            </span>
          </Tooltip>

          <Tooltip title="Share">
            <span onClick={handleShare} className="icon-btn">
              <AiOutlineShareAlt className="icons" />
            </span>
          </Tooltip>

          <Tooltip title="Add to Playlist">
            <span className="icon-btn">
              <MdPlaylistAdd className="icons" />
            </span>
          </Tooltip>

          <Tooltip title="More Options">
            <span className="icon-btn">
              <MdOutlineMoreVert className="icons" />
            </span>
          </Tooltip>

          <Tooltip title="Download">
            <span onClick={handleDownload} className="icon-btn">
              <AiOutlineDownload className="icons" />
            </span>
          </Tooltip>
        </div>
      </div>

      <hr />

      {/* ✅ Publisher Section */}
      <div className="publisher">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar
            className="avatar"
            size={64}
            src={channelData?.snippet?.thumbnails?.default?.url}
          />
          <div>
            <p>{videoData?.snippet?.channelTitle || "Channel Name"}</p>
            <span>
              {channelData
                ? `${formatCount(
                    channelData.statistics.subscriberCount
                  )} Subscribers`
                : "Loading..."}
            </span>
          </div>
        </div>

        <button
          className={`subscribe-btn ${subscribed ? "subscribed" : ""}`}
          onClick={handleSubscribe}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      {/* ✅ Video Description + Comments */}
      <div className="vid-description">
        <p>
          {videoData
            ? videoData.snippet.description.slice(0, 250)
            : "Loading description..."}
        </p>
        <hr />
        <h4>
          {videoData
            ? `${formatCount(videoData.statistics.commentCount)} Comments`
            : "Loading comments..."}
        </h4>

        {commentData.length > 0 ? (
          <>
            {commentData.slice(0, visibleComments).map((item, index) => {
              const comment = item.snippet.topLevelComment.snippet;
              return (
                <div className="comment" key={index}>
                  <Avatar
                    className="avatar"
                    size={40}
                    src={comment.authorProfileImageUrl}
                  />
                  <div>
                    <h3>
                      {comment.authorDisplayName}
                      <span>
                        {new Date(comment.publishedAt).toDateString()}
                      </span>
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: comment.textDisplay,
                      }}
                    />
                    <div className="comment-actions">
                      <AiOutlineLike className="icon" />
                      <span>{formatCount(comment.likeCount)}</span>
                      <AiOutlineDislike className="icon" />
                    </div>
                  </div>
                </div>
              );
            })}

            <p className="see-more" onClick={showMoreComments}>
              {visibleComments < commentData.length
                ? "See more comments"
                : "Hide comments"}
            </p>
          </>
        ) : (
          <p>Loading comments...</p>
        )}
      </div>

      {/* ✅ Recommended videos appear below for mobile */}
      {isMobile && <Recommended categoryID={categoryID} />}
    </div>
  );
};

export default PlayVideo;

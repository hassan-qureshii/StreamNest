import './Feed.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY } from '../../Data';
import { Row, Col, Skeleton, Layout } from 'antd';

const { Content } = Layout;

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    try {
      const response = await fetch(videoList_url);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // Format views (K, M)
  const formatViews = (views) => {
    if (!views) return '0';
    const num = parseInt(views, 10);
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
  };

  // Format published date (like YouTube)
  const formatDate = (dateString) => {
    const published = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - published) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <Content className="feed">
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
            <div className="feed-content">
              <Link
                to={`/video/${item.snippet.categoryId}/${item.id}`}
                className="feed-link"
              >
                {loading ? (
                  <>
                    <Skeleton.Image className="skeleton-img" active />
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </>
                ) : (
                  <>
                    <img
                      src={item.snippet?.thumbnails?.medium?.url}
                      className="image"
                      alt="Thumbnail"
                    />
                    <h2>{item.snippet?.title}</h2>
                    <h3>{item.snippet?.channelTitle}</h3>
                    <p>
                      {formatViews(item.statistics?.viewCount)} views •{' '}
                      {formatDate(item.snippet?.publishedAt)}
                    </p>
                  </>
                )}
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Content>
  );
};

export default Feed;

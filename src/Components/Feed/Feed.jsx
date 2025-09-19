import './Feed.css';
import { useState, useEffect } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { API_KEY } from '../../Data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=PK&videoCategoryId=${category}&key=${API_KEY}`;

    try {
      const response = await fetch(videoList_url);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(); 
  }, [category]);

  const { Content } = Layout;

  return (
    <Content>
      <div className="feed">
        <Row gutter={[16, 16]}>
          {data.map((item, index) => (
            <Col key={index} sm={24} md={12} lg={8} xl={8}>
              <div className="feed-content">
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="feed-link">
                  {loading ? (
                    <>
                      <Skeleton.Image className="skeleton-img" active />
                      <Skeleton active paragraph={{ rows: 3 }} />
                    </>
                  ) : (
                    <>
                      <img src={item.snippet.thumbnails.medium.url} className="image" alt="Thumbnail" />
                      <h2>{item.snippet.title}</h2>
                      <h3>{item.snippet.channelTitle}</h3>
                      <p>{item.statistics.viewCount} views • {new Date(item.snippet.publishedAt).toLocaleDateString()}</p>
                    </>
                  )}
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default Feed;

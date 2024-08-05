import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Card, Row, Col } from "react-bootstrap";

const Videos = () => {
  const { auth } = useAuth();
  const [videos, setVideos] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [playingVideo, setPlayingVideo] = useState(null);

  const handleImageClick = (index) => {
    setPlayingVideo(index);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getVideos = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/videos?username=${auth.id}`,
          {
            signal: controller.signal,
          }
        );

        if (isMounted) {
          // Sometimes this is sent as an array of arrays, so we flatten it
          // Sometimes
          const respVideos =
            Array.isArray(response.data) && Array.isArray(response.data[0])
              ? response.data.flat()
              : response.data;
          setVideos(respVideos);
        }
        console.log("videos", videos);
      } catch (err) {
        console.error(err);
      }
    };
    getVideos();

    return () => {
      isMounted = false;
      //   controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Video List</h2>
      {videos?.length > 0 && videos[0] != "No files found" ? (
        <Row>
          {videos.map((video, i) => (
            <Col md={4} key={i}>
              <Card style={{ width: "18rem" }} className="h-100" key={i}>
                {playingVideo === i ? (
                  <video
                    src={`https://d14dew3747d7ve.cloudfront.net/${video}`}
                    controls
                    muted
                    autoPlay
                    loop
                    preload="auto"
                    width="640"
                    height="360"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src={`https://picsum.photos/200/300?random=${i}`}
                    onClick={() => handleImageClick(i)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>Video {i + 1}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No videos to display</p>
      )}
    </article>
  );
};

export default Videos;

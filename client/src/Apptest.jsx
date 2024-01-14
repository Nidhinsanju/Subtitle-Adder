import axios from "axios";
import { useEffect, useState } from "react";

function Apptest() {
  const [video1, setVideo1] = useState();
  const [view, setView] = useState("");
  const video = "https://converterapp1.s3.amazonaws.com//5702/video.mp4";
  const sub = "https://converterapp1.s3.amazonaws.com//5702/subtitle.vtt";
  //   const base
  //   const videoURL = URL.createObjectURL(video);
  //   setView(videoURL);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(
          "https://converterapp1.s3.amazonaws.com//5702/video.mp4"
        );
        setView(response.data.videoUrl);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchVideoUrl();
  }, []);
  return (
    <div>
      <video width="640" height="360" controls>
        {view && <source src={view} type="video/mp4" />}
        <track src={sub} type="text/.vtt" />
      </video>
    </div>
  );
}
export default Apptest;

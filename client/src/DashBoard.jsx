import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./Constents/api";
import "./App.css";

function DashBoard() {
  const navigate = useNavigate();
  const [rawVideo, setrawVideo] = useState(null);
  const [binText, setbinText] = useState("");
  const [baseVideo, setbaseVideo] = useState("");
  const [view, setView] = useState("");
  const token = localStorage.getItem("token");
  const CustomerID = localStorage.getItem("CustomerID");

  const fileupload = (event) => {
    const file = event.target.files?.[0];
    setrawVideo(file);
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setView(videoURL);
      const reader = new FileReader();
      reader.onload = function (e) {
        const baseVideo1 = e.target.result.split(",")[1];
        setbaseVideo(baseVideo1);
      };
      reader.readAsDataURL(file);
    }
  };

  const textsave = (event) => {
    const sub = event.target.value;
    if (sub) {
      const textBlob = new Blob([sub], { type: "text/vtt" });
      const reader = new FileReader();
      reader.onload = function (e) {
        const baseVideo1 = e.target.result.split(",")[1];
        setbinText(baseVideo1);
      };
      reader.readAsDataURL(textBlob);
    }
  };

  const fileSave = async () => {
    if (rawVideo) {
      const datatoSend = {
        bVideo: baseVideo,
        bText: binText,
        CustomerID: CustomerID,
      };

      try {
        const response = await axios.post(
          BACKEND_URL + "/postdata",
          datatoSend,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          navigate("/error/");
          console.log(response);
          console.log("not able to save files");
        } else {
          navigate("/cart/");
          console.log("Upload response:", response.data);
        }
      } catch (error) {
        navigate("/error/");
        console.error("Error uploading:", error);
      }
    } else {
      alert("No vidoe file Found");
    }
  };
  return (
    <div>
      <header>
        <button
          onClick={() => {
            localStorage.setItem("CustomerID", null);
            localStorage.setItem("token", null);
            navigate("/login");
          }}
        >
          Logut
        </button>
        <button
          style={{ margin: "20px" }}
          onClick={() => {
            navigate("/cart/");
          }}
        >
          Cart
        </button>
        <br />
        <input type="file" accept="video/*" onChange={fileupload}></input>
        Video Preview
      </header>
      <main>
        <video width="640" height="360" controls>
          {rawVideo && <source src={view} type="video/mp4" />}
        </video>
      </main>
      <br />

      <article>
        Add the subtitles as You want in the VTT file format
        <br />
        <label style={{ padding: "10px" }}>
          <textarea
            style={{ padding: "5px" }}
            name="postContent"
            defaultValue="Example:
WEBVTT
  
1
00:01.000 --> 00:04.000
- Never drink liquid nitrogen.

2
00:05.000 --> 00:09.000
- It will perforate your stomach.
- You could die."
            rows={25}
            cols={100}
            onChange={textsave}
          />
        </label>
        <br />
        <button onClick={fileSave}>Submit</button>
      </article>
    </div>
  );
}

export default DashBoard;

// const formData = new FormData();
// //covert the video file to Base64
// const reader = new FileReader();
// reader.onload = function (e) {
//   const baseVideo = e.target.result.split(",")[1];
//   formData.append("baseVideo", baseVideo);
//   console.log(baseVideo);
// };
// reader.readAsDataURL(rawVideo);
// //Save the text as binary file
// formData.append("subtitle", binText);
// formData.append("CustomerID", CustomerID);
// saveFilesToServer(formData);

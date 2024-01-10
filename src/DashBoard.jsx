import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./Constents/api";
import "./App.css";

function DashBoard() {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [text, setText] = useState({});
  const [view, setView] = useState("");
  const token = localStorage.getItem("token");
  const CustomerID = localStorage.getItem("CustomerID");
  const fileupload = (event) => {
    const file = event.target.files?.[0];
    setVideo(file);
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setView(videoURL);
    }
  };

  const textsave = (event) => {
    const sub = event.target.value;
    const textBlob = new Blob([sub], { type: "text/vtt" });
    setText(textBlob);
  };

  const fileSave = async () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("subtitle", text);
    formData.append("CustomerID", CustomerID);

    try {
      const response = await axios.post(BACKEND_URL + "/getdata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        console.log(response);
        console.log("not able to save files");
      } else {
        console.log("Upload response:", response.data);
      }
    } catch (error) {
      console.error("Error uploading:", error);
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
        <br />
        <input type="file" accept="video/*" onChange={fileupload}></input>
        Video Preview
      </header>
      <main>
        <video width="640" height="360" controls>
          {video && <source src={view} type="video/mp4" />}
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

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./Constents/api";
import "./App.css";

function DashBoard() {
  const navigate = useNavigate("");
  const [video, setVideo] = useState(null);

  const [text, setText] = useState("");
  const symbol = "-->";

  const fileupload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideo(videoURL);
    }
  };

  const textsave = (event) => {
    setText(event.target.value);
  };

  const fileSave = () => {
    axios
      .post(BACKEND_URL + "/getdata", { text })
      .then((response) => {
        console.log(response.status);
        console.log("File saved on the server:", response.data);
      })
      .catch((error) => {
        console.error("Error saving file on the server:", error);
      });
  };

  const addSub = () => {
    navigate("/addSub/");
  };

  return (
    <div>
      <header>
        <input type="file" accept="video/*" onChange={fileupload}></input>
        Video Preview
      </header>
      <main>
        <video width="640" height="360" controls>
          {video && <source src={video} type="video/mp4" />}
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

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const CustomerID = localStorage.getItem("CustomerID");

  return (
    <div>
      <header
        style={{
          margin: 0,
          padding: "30px",
          backgroundColor: "red",
          border: "2px solid red",
        }}
      >
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            if (CustomerID) {
              navigate("/Dashboard/");
            } else {
              alert("Login to Continue");
              navigate("/login/");
            }
          }}
        >
          Dashboard
        </button>
      </header>

      <main>
        <h3>Welcome to Sub add</h3>
        <h4>Match your video with Your own Subtitles as You Wish</h4>
        <img
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center ",
          }}
          src="https://gumlet-blog-content.gumlet.io/learn/content/images/2023/10/how-to-add-subtitles-to-a-video.png?w=3840&q=70"
          width="70%"
          height="70%"
        />
      </main>
    </div>
  );
}
export default Home;

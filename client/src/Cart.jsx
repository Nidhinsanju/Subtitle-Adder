import axios from "axios";
import { BACKEND_URL } from "./Constents/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const customerID = localStorage.getItem("CustomerID");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [video, setVideo] = useState();
  const [s3vid, setS3vid] = useState("");
  const [s3sub, setS3sub] = useState("");
  // const [view, setView] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BACKEND_URL + "/showdata",
          {
            CustomerId: customerID,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status !== 200) {
          alert("error fetching data");
        } else {
          const src = response.data.cart.Files;
          if (src) {
            setS3sub(src.Subtitle);
            setS3vid(src.Video);
          } else {
            alert("No response from server");
          }
        }
      } catch (error) {
        navigate("/error/");
      }
    };
    fetchData();
  });

  return (
    <div>
      <button
        style={{ margin: "10px" }}
        onClick={() => {
          localStorage.setItem("CustomerID", null);
          localStorage.setItem("token", null);
          navigate("/login");
        }}
      >
        Logut
      </button>
      <button
        style={{ margin: "10px" }}
        onClick={() => {
          navigate("/Dashboard");
        }}
      >
        Dashboard
      </button>
      <header style={{ margin: "13px" }}>
        <video width="640" height="360" controls>
          {s3vid && <source src={s3vid} type="video/mp4" />}
          <track kind="captions" src={s3sub} srcLang="en" label="english sub" />
        </video>
      </header>
    </div>
  );
}
export default Cart;

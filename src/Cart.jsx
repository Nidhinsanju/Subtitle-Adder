import axios from "axios";
import { BACKEND_URL } from "./Constents/api";
import { useEffect, useState } from "react";

function Cart() {
  const customerID = localStorage.getItem("CustomerID");
  const token = localStorage.getItem("token");
  const [video, setVideo] = useState("");
  const [view, setView] = useState("");

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
          console.log("error");
        } else {
          const src = response.data;
          // console.log(src.cart.Video[0].data);
          // const data1 = src.cart.Video[0].data;

          if (data1) {
            const videoURL = URL.createObjectURL(data1);
            setView(videoURL);
          }
          // src.video?.map((data) => {
          //   console.log(data.cart.cart);
          // });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <div>
      <header>
        <video width="640" height="360" controls>
          {video && <source src={view} type="video/mp4" />}
        </video>
      </header>
      <main></main>
    </div>
  );
}
export default Cart;

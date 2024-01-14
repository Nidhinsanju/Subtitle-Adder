import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./Constents/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        SignUP
      </button>
      <div
        style={{
          paddingTop: "250px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>Welcome Back Log-in</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center " }}>
        <Card variant="outlined" style={{ width: "400px", padding: "20px" }}>
          <TextField
            onChange={(e) => {
              setusername(e.target.value);
            }}
            size="medium"
            id="outlined-basic1"
            label="Username"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            id="outlined-basic2"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                if (!username || !password) {
                  alert("No Username or Password Found ");
                } else {
                  const response = await axios.post(BACKEND_URL + "/login", {
                    username: username,
                    password: password,
                  });
                  const data = response.data;
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("CustomerID", data.CustomerID);
                  window.location = "/dashboard/";
                }
                //logged in successfully
              } catch (error) {
                if (error.request) {
                  // The request was made but no response was received

                  alert("error");

                  return <div>Unexpected Server Error</div>;
                }
              }
            }}
          >
            Log In
          </Button>
          {/* <Button
            variant="outlined"
            onClick={() => {
              navigate("/login/");
            }}
          >
            SignUp
          </Button> */}
        </Card>
      </div>
    </div>
  );
}
export default Login;

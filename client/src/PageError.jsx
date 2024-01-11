import { useNavigate } from "react-router-dom";

function PageError() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Sorry Error Occurred</h1>
      <br />
      <h2>Please Try Logging In Again</h2>
      <button
        onClick={() => {
          navigate("/login/");
        }}
      >
        Login
      </button>
    </div>
  );
}
export default PageError;

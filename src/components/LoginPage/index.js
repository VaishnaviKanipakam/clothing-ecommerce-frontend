import { useState } from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Cookies from "js-cookie";


import "./index.css"

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitSuccess = (token) => {
         Cookies.set("jwt_token", token, { expires: 5 });
        navigate("/dashboard")
  }

  const renderEmailField = () => {
    return (
      <CustomInput
        label="Email"
        type="email"
        required
        value={email}
        placeholder="johndoe@emample.com"
        onChange={(e) => setEmail(e.target.value)}
        icon={<EmailOutlinedIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

  const renderPasswordField = () => {
    return (
      <CustomInput
        label="Password"
        type="password"
        required
        value={password}
        placeholder="Atleast 8 charecters"
        onChange={(e) => setPassword(e.target.value)}
        icon={<KeyOutlinedIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

  const onSubmitLoginForm = async event => {
    event.preventDefault()
    const loginDetails = {password, email}
    const url = "http://localhost:5000/login";

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    };

    const response = await fetch(url, options);
    console.log("58LoginResponse", response);
    if (response.ok === true) {
      const successData = await response.json();
      console.log("189Login", successData)
      onSubmitSuccess(successData.token);
      localStorage.setItem("user", JSON.stringify(successData));
      setEmail("");
      setPassword("");
      setErrorMessage("")
      setMessage(true)
    } else if (response.ok === false) {
      const errorData = await response.json();
      console.log("198Login", errorData);
      setErrorMessage(errorData);
      setMessage(false);
    }
  }

    const messageClassname = message ? "success-message" : "error-message";
  

  return (
    <div className="login-container">
      <form
           onSubmit={onSubmitLoginForm}
        className="flex flex-col box-border items-center justify-center p-8 bg-[#ffffff] w-fit rounded-xl shadow-2xl"
      >
        <h1 className="text-[#000000] font-extrabold text-3xl mb-3">Login</h1>
        <div>{renderEmailField()}</div>
        <div>{renderPasswordField()}</div>
        <p className={`text-base mt-2 ${messageClassname}`}>
          {message ? "" : errorMessage}
        </p>
        <div className="w-full">
          <CustomButton
            type="submit"
            variant="contained"
            sx={{
              color: "#ffffff",
              backgroundColor: "#000000",
              marginTop: "30px",
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "15px",
            }}
          >
            Login
          </CustomButton>
        </div>
        <p className="text-[#000000] font-georgia mt-8 text-base">
          Don't have account?{" "}
          <Link to="/register">
            <span className="text-blue-600 underline font-medium">Signup</span>
          </Link>
        </p>
      </form>
    </div> 
  );
};

export default LoginPage;

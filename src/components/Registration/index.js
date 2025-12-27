import { useState } from "react";
import CustomInput from "../CustomInput";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Registration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitSuccess = () => {
    navigate("/login");
  };

  const renderNameField = () => {
    return (
      <CustomInput
        label="Name"
        type="text"
        required
        value={name}
        placeholder="John Doe"
        onChange={(e) => setName(e.target.value)}
        icon={<PermIdentityOutlinedIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

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

  const renderConfirmPassword = () => {
    return (
      <CustomInput
        label="Confirm Password"
        type="password"
        required
        value={confirmPassword}
        placeholder="Atleast 8 charecters"
        onChange={(e) => setconfirmPassword(e.target.value)}
        icon={<KeyOutlinedIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

  const onSubmitRegistrationForm = async (event) => {
    event.preventDefault();
    const url = "http://localhost:5000/registration";
    const userDetails = { name, email, password, confirmPassword };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    if (response.ok === true) {
      const successData = await response.json();
      onSubmitSuccess();
      setSuccessMessage(successData);
      setMessage(true);
      setName("");
      setEmail("");
      setPassword("");
      setconfirmPassword("");
    } else if (response.ok === false) {
      const errorData = response.json();
      setErrorMessage(errorData);
      setMessage(false);
    }
  };

  const messageClassname = message ? "success-message" : "error-message";

  return (
    <div className="registration-container">
      <form
        onSubmit={onSubmitRegistrationForm}
        className="flex flex-col box-border items-center justify-center p-8 m-5 bg-[#ffffff] w-fit rounded-xl shadow-2xl"
      >
        <h1 className="text-[#000000] font-extrabold text-3xl mb-7">
          Create Your Account
        </h1>
        <div>{renderNameField()}</div>
        <div>{renderEmailField()}</div>
        <div>{renderPasswordField()}</div>
        <div>{renderConfirmPassword()}</div>
        <p className={`text-base mt-2 ${messageClassname}`}>
          {message ? successMessage : errorMessage}
        </p>
        <div className="w-full">
          <CustomButton
            type="submit"
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
            Create Account
          </CustomButton>
        </div>
        <p className="text-[#000000] font-georgia mt-8 text-base">
          Already have account?{" "}
          <Link to="/login">
            <span className="text-blue-600 underline font-medium">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;

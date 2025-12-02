import LandingPageHeader from "../LandingPageHeader";
import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";


import "./index.css";

const LandingPage = () => {
  return (
    <div className="landing-page-contianer">
      <LandingPageHeader />

      <h1 className="text-5xl text-[#000000] font-bold">
        Your Daily Style Destination
      </h1>
      <p className="w-[50%] text-center mt-3 text-gray-600">
        Discover our curated collection of modern, versatile apparel designed to
        make you look and feel your best, from casual weekend wear to
        sophisticated evening attire
      </p>
      <Link to="/register">
        <CustomButton>Create Account</CustomButton>
      </Link>
      
    </div>
  );
};

export default LandingPage;

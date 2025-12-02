import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Avatar from "@mui/material/Avatar";
import CustomButton from "../CustomButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -10px;
    right: -5px;
    background-color: #ffffff !important;
    color: #000000 !important;
    font-weight: bold;
  }
`;

const DashboardHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("22DashboardHeader", user.result[0].name);
  const name = user?.result?.[0]?.name || "U";

  const onClickLogoutButton = () => {
    localStorage.removeItem("user");
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="dashboard-header-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDs0jsNaC9eXkdpnEboYBdxz0c6x_-pLxc4w&s"
        alt="logo"
        className="logo-img"
      />

      <ul className="flex flex-row items-center space-x-4 list-none">
        <Link to="/dashboard" className="no-underline">
          <li className="text-white font-semibold text-base">Home</li>
        </Link>

        <Link to="/men" className="no-underline">
          <li className="text-white font-semibold text-base">Men</li>
        </Link>

        <Link to="/women" className="no-underline">
          <li className="text-white font-semibold text-base">Women</li>
        </Link>

        <Link to="/kids" className="no-underline">
          <li className="text-white font-semibold text-base">Kids</li>
        </Link>
      </ul>

      <div className="flex items-center space-x-6">
        <IconButton sx={{ p: 0 }}>
          <div className="relative flex items-center justify-center">
            <ShoppingCartIcon sx={{ color: "#ffffff", fontSize: "25px" }} />
            <CartBadge badgeContent={2} overlap="circular" />
          </div>
        </IconButton>

        <Avatar
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            fontSize: "18px",
            fontWeight: "bold",
            width: 38,
            height: 38,
          }}
        >
          {name[0].toUpperCase()}
        </Avatar>

        <CustomButton
          onClick={onClickLogoutButton}
          sx={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          Logout
        </CustomButton>
      </div>
    </div>
  );
};

export default DashboardHeader;

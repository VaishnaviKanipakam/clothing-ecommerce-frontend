import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./index.css";

const LandingPageHeader = () => {
  return (
    <div>
      <nav className="nav-bar-container">
        <div className="icon-brand-container">
          <ShoppingCartIcon style={{ fontSize: "35px", marginLeft: "10px" }} />
          <h1 className="brand-heading">Clothing</h1>
        </div>

        <div className="chat-notification-profile-container">
          <p className="text-base font-semibold mr-5">Home</p>
          <p className="text-base font-semibold mr-5">Cart</p>
          <p className="text-base font-semibold mr-5">Products</p>
        </div>
      </nav>
    </div>
  );
};

export default LandingPageHeader;

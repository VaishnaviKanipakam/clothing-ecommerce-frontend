import CustomCarousel from "../CustomCarousel";
import { Link } from "react-router-dom";

import "./index.css";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center min-h-screen overflow-y-scroll">
      <CustomCarousel className="mb-10" />
      <div className="self-center box-border w-[80%] text-center">
        <h1 className="text-black font-bold text-[30px] mt-5">
          Our Collections
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-3">
          <Link
            to="/men"
            className="flex flex-col items-center no-underline mr-2"
          >
            <img
              src="https://images.pexels.com/photos/15568433/pexels-photo-15568433.jpeg?_gl=1*t3zmxg*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MTkzOTAkbzIkZzEkdDE3NjQ1MTk0MjAkajMwJGwwJGgw"
              alt="mensClothes"
              className="h-[300px] w-[300px]  transition transform hover:scale-105 duration-300 shadow-lg rounded-xl"
            />
            <h3 className="text-[#000000] text-[20px] font-semibold mt-4">
              Men Clothes
            </h3>
          </Link>

          <Link
            to="/women"
            className="flex flex-col items-center no-underline mr-4"
          >
            <img
              src="https://images.pexels.com/photos/15788298/pexels-photo-15788298.jpeg?_gl=1*1ca6y83*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MTkzOTAkbzIkZzEkdDE3NjQ1MjAyMTQkajE4JGwwJGgw"
              alt="mensClothes"
              className="h-[300px] w-[300px]  transition transform hover:scale-105 duration-300 shadow-lg rounded-xl"
            />
            <h3 className="text-[#000000] text-[20px] font-semibold mt-4">
              Women Clothes
            </h3>
          </Link>

          <Link to="/kids" className="flex flex-col items-center no-underline">
            <img
              src="https://images.pexels.com/photos/6349572/pexels-photo-6349572.jpeg?_gl=1*hv3sqx*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MTkzOTAkbzIkZzEkdDE3NjQ1MjAyNzYkajU4JGwwJGgw"
              alt="mensClothes"
              className="h-[300px] w-[300px]  transition transform hover:scale-105 duration-300 shadow-lg rounded-xl"
            />
            <h3 className="text-[#000000] text-[20px] font-semibold mt-4">
              Kids Wear
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

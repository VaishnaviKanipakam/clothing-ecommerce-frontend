import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3">Clothing Website</h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for trendy men, women and kids clothing.
          </p>     
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Men</li>
            <li className="hover:text-white cursor-pointer">Women</li>
            <li className="hover:text-white cursor-pointer">Kids</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <Link to="/my-plofile" className="no-underline text-gray-400">
              <li className="hover:text-white cursor-pointer">My Orders</li>
            </Link>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <span className="hover:text-white cursor-pointer">Instagram</span>
            <span className="hover:text-white cursor-pointer">Facebook</span>
            <span className="hover:text-white cursor-pointer">Twitter</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-4000">
        ©️ {new Date().getFullYear()} Clothing Website. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;

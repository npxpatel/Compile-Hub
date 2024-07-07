import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import axios from "axios";

const BACKEND_URL = "https://wd-compiler-backend.vercel.app"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logoutEvent() {
    try {
      await axios.post(`${BACKEND_URL}/user/logout`);
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log("Error while logging out");
    }
  }

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <nav className="w-full p-3 h-[60px] bg-gray-900 flex items-center justify-between text-white select-none z-50 relative">
      <h2 className="font-bold">
        <Link to="/">WDCompiler</Link>
      </h2>
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      <ul className={`md:flex  md:justify-end lg:gap-2 space-y-3 lg:space-y-1 px-4 lg:px-2 absolute md:static top-[60px]  left-0 w-full bg-gray-900 ${isMenuOpen ? "block" : "hidden"} md:block z-50`}>
        <li className="border-b border-gray-700 md:border-none">
        <Link to="/compile" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full mt-1">Compiler</Button>
              </Link>
        </li>
        {!isLoggedIn && (
          <>
            <li className="border-b border-gray-700 md:border-none">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Login</Button>
              </Link>
            </li>
            <li className="border-b border-gray-700 md:border-none ">
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full mb-4 lg:mb-0">Signup</Button>
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li className="border-b border-gray-700 md:border-none ">
            <Button onClick={() => { logoutEvent(); setIsMenuOpen(false); }} className="w-full ">Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;


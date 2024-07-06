import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <nav className=" w-full items-center p-3 h-[60px] bg-gray-900 flex justify-between  text-white select-none ">
      <h2 className="font-bold select-none">
        <Link to="/">WB Compiler</Link>
      </h2>
      <ul className="flex gap-3">
        <li >
          <Link to="/compile">
            <div className=" text-sm font-medium  hover:underline pr-10 pt-2">Compiler</div>
          </Link>
        </li>
        <li>
        <Link to="/login">  <Button >Login</Button> </Link>
        
        </li>
        <li>
          <Link to="signup">  <Button>Signup</Button> </Link>
        
        </li>
      </ul>
    </nav>
  );
};

export default Header;

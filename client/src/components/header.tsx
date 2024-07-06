import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import axios from "axios";


const Header = () => {
    
   const navigate = useNavigate();
   const dispatch = useDispatch();

   async function logoutEvent() {
       try{
            await axios.post("http://localhost:3000/user/logout")
            dispatch(logout())
            navigate("/login")
            
       } 
       catch(err){
         console.log("Error while logging out")
       }
   }


  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <nav className=" w-full items-center p-3 h-[60px] bg-gray-900 flex justify-between  text-white select-none ">
      <h2 className="font-bold select-none">
        <Link to="/">WB Compiler</Link>
      </h2>
      <ul className="flex gap-3">
        <li >
          <Link to="/compile">

            <div className=" text-sm font-medium items-center hover:underline  pt-2">Compiler</div>
          </Link>
        </li>
        <li>

       { !isLoggedIn &&  <Link to="/login">  <Button >Login</Button> </Link> } 
        
        </li>
        <li>
        {!isLoggedIn &&  <Link to="signup">  <Button>Signup</Button> </Link>}  
        
        </li>
        <li>
        {isLoggedIn &&  <Link to="signup">  <Button onClick={logoutEvent} >Logout</Button> </Link>}  
        
        </li>
      </ul>
    </nav>
  );
};

export default Header;

import "./loginStyles/motionBg.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputType } from "@/types";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {login} from "@/redux/slices/authSlice"


const BACKEND_URL = "https://wd-compiler-backend.vercel.app"


export default function Login() {
  const navigate  = useNavigate();
  const [loading , setLoading] = useState(false);
  const [inputs, setInputs] = useState<LoginInputType>({
    userId: "",
    password: "",
  });

  const dispatch = useDispatch();

  async function onSubmit(event: any) {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/login`,
        inputs,
      );
      setLoading(false);
      dispatch(login())
      localStorage.setItem('token', response.data.token);
      navigate("/compile")
      console.log(response.data);
    
    } catch (error) {
       alert("Incorrect credentials !");
      console.error("Unexpected error", error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen container">
      <div className="w-full max-w-sm p-6 bg-card dark:bg-[#000000] rounded-lg shadow-lg -mt-10 border-[1px]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground dark:text-white">
            Welcome back
          </h1>
          <p className="text-muted-foreground dark:text-[#a9a9b3]">
            Log in to your account to continue
          </p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="name" className="dark:text-white">
              Username
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Username or email here "
              required
              onChange={(e) => {
                setInputs({ ...inputs, userId: e.target.value });
              }}
            />
          </div>
          <div>
            <Label htmlFor="password" className="dark:text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? `Loging in..` : `Log in`}
          </Button>
        </form>
        <div className="mt-4 text-center text-muted-foreground dark:text-[#a9a9b3]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-primary text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

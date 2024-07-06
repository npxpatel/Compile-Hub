import "./loginStyles/motionBg.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { SignupInputType } from "@/types";
import { useState } from "react";
import axios from "axios";



export default function Signup() {
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
  const [inputs, setInputs] = useState<SignupInputType>({
    username: "",
    password: "",
    email: "",
  });

  async function onSubmit(event: any) {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        inputs
      );
      setLoading(false);
      console.log(response.data);
      navigate("/compile")
    } catch (error) {
      console.error("Unexpected error", error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen container">
      <div className="w-full max-w-sm p-6 bg-card dark:bg-[#000000] rounded-lg shadow-lg -mt-10 border-[1px]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-foreground dark:text-white">
            Create an Account
          </h1>
          <p className="text-muted-foreground dark:text-[#a9a9b3]">
            Join our platform and start exploring the features.
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
              placeholder="Enter your username"
              required
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
          </div>
          <div>
            <Label htmlFor="email" className="dark:text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
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
            {loading ? `Signing up..` : `Sign up`}
          </Button>
        </form>
        <div className="mt-4 text-center text-muted-foreground dark:text-[#a9a9b3]">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary text-blue-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

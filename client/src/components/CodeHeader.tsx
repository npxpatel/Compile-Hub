import { Button } from "./ui/button";
import { Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  compilerStateType,
  updateLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CopyIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const BACKEND_URL = "https://wd-compiler-backend.vercel.app"


export default function CodeHeader() {
   
  const {urlId} = useParams();
  const [sharebtn, setSharebtn] = useState<boolean>(false);

  useEffect(() => {
    if(urlId){
      setSharebtn(true);
    } else {
      setSharebtn(false);
    }
  } ,[urlId] )

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { html, css, javascript } = useSelector(
    (state: RootState) => state.compilerSlice.allCodes
  );

  const saveCode = async () => {
    setLoading(true);
    const route = urlId ? `${BACKEND_URL}/compiler/edit/${urlId}` : `${BACKEND_URL}/compiler/save`;
    
    try {
      const result = await axios.post(
        route,   
        {
          html,
          css,
          javascript, 
          urlId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      console.log(result.data);
      navigate(`/compile/${result.data.url}`, { replace: true });
    } 
     catch (err) {
      if(urlId){
        alert("You are not the chosen one to edit this code 😁")
      }
      else{
        alert("Please login to save the code")
      }
      
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  

  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  return (
    <div className=" h-[50px] flex items-center  bg-black p-2 text-white justify-between ">
      <div className="flex gap-3">
        <Button
          onClick={saveCode}
          className="flex justify-center items-center   gap-2"
          variant="done"
          disabled={loading}
        >
          <Save size={16} />
          {/* {loading ? "Saving..." : "Save"} */}
        </Button>


        {sharebtn && <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Share</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={window.location.href} readOnly />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={() => {
                  window.navigator.clipboard.writeText(window.location.href);
                }}
              >
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
         }

        
      </div>

      <div className="switch_tab flex justify-center items-center gap-2">
        <p className="text-sm font-semibold">Lang:</p>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) => {
            dispatch(
              updateLanguage(value as compilerStateType["currentLanguage"])
            );
          }}
        >
          <SelectTrigger className=" w-[110px] lg:w-[180px] bg-gray-800 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

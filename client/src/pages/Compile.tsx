import CodeEditor from "@/components/CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import CodeHeader from "@/components/CodeHeader";
import Rendercode from "./Rendercode";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFullCode } from "@/redux/slices/compilerSlice";


const BACKEND_URL = "https://wd-compiler-backend.vercel.app"

export default function Compile() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const id = parseInt(urlId!);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loadCode = async () => {
    try {
      const result = await axios.post(
        `${BACKEND_URL}/compiler/load`,
        { urlId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.code) {
        const { html, css, javascript } = result.data.code;
        console.log(result.data);
        dispatch(updateFullCode({ html, css, javascript }));
      } else {
        console.error("Code data is undefined");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);

  return (
    <div className="flex flex-col h-screen">
      <ResizablePanelGroup
        direction={windowWidth > 768 ? "horizontal" : "vertical"}
        className="flex-grow"
      >
        <ResizablePanel className="min-h-[100px] min-w-[350px]" defaultSize={50}>
          <CodeHeader />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="min-h-[100px] min-w-[350px]" defaultSize={50}>
          <Rendercode />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

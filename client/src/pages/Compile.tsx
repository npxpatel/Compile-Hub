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
import { useDispatch, useSelector } from "react-redux";
import { updateCodeValue, updateFullCode,updateGivenCode } from "@/redux/slices/compilerSlice";
import { io } from "socket.io-client";
import { RootState } from "@/redux/store";

const BACKEND_URL = "https://wd-compiler-backend.vercel.app"; 
const SOCKET_URL = BACKEND_URL;

export default function Compile() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const id = parseInt(urlId!);
  const [socket, setSocket] = useState<any>(null);

  // const code = useSelector((state: RootState) => state.compilerSlice.allCodes);
  const currentLanguage = useSelector(
      (state: RootState) => state.compilerSlice.currentLanguage
    );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    newSocket.emit("join-document", id);

    newSocket.on("load-document", (data) => {
      console.log("Document loaded:", data);
      dispatch(updateFullCode(data));
    });

    newSocket.on("receive-changes", ({ language, content }) => {
      console.log(`Received update for ${language}:`, content);
      dispatch(updateGivenCode({language, code : content})); // Update only the relevant language
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id, dispatch]);

  // Load code from backend if WebSocket doesn't have it
  const loadCode = async () => {
    try {
      const result = await axios.post(
        `${BACKEND_URL}/compiler/load`,
        { urlId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (result.data.code) {
        dispatch(updateFullCode(result.data.code));
      }
    } catch (err) {
      console.error("Failed to load code:", err);
    }
  };

  useEffect(() => {
    if (urlId) loadCode();
  }, [urlId]);

  // Send changes to the server
  const handleCodeChange = (updatedCode: string) => {
    if (socket) {
      console.log("Emitting changes:", updatedCode);
      socket.emit("send-changes", {
        docId: id,
        content: updatedCode,
        language: currentLanguage, // Send only current language changes
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ResizablePanelGroup
        direction={windowWidth > 768 ? "horizontal" : "vertical"}
        className="flex-grow"
      >
        <ResizablePanel className="min-h-[100px] min-w-[350px]" defaultSize={50}>
          <CodeHeader />
          <CodeEditor onCodeChange={handleCodeChange} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="min-h-[100px] min-w-[350px]" defaultSize={50}>
          <Rendercode />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

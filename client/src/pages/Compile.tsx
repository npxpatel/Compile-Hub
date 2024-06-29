import CodeEditor from "@/components/CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import CodeHeader from "@/components/CodeHeader";
import Rendercode from "./Rendercode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFullCode } from "@/redux/slices/compilerSlice";

export default function Compile() {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const id = parseInt(urlId!);

  const loadCode = async () => {
    try {
      const result = await axios.post("http://localhost:3000/compiler/load", {
        urlId: id,
      });

      const { html, css, javascript } = result.data.code;
      // const fullCode = {html, css, javascript};
      console.log(result.data);

      dispatch(updateFullCode({ html, css, javascript }));
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
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className=" h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <CodeHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        className=" h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <Rendercode></Rendercode>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

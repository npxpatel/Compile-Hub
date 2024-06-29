import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"



export default function Rendercode() {
   
    const fullCode = useSelector( (state : RootState) => state.compilerSlice.allCodes);

    const Code = `<html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>`

    const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
     Code    
)}`;
    
    
  return (
    <div>
     
    <iframe className="w-full h-[calc(100vh-60px)]" src={iframeCode} />

    </div>
  )
}

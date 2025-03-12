import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";

import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCodeValue } from "@/redux/slices/compilerSlice";


interface CodeEditorProps{
  onCodeChange? : (code : string, currentLanguageUsed : string) => void
}

export default function CodeEditor( {onCodeChange} : CodeEditorProps) {
  
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.allCodes
  );

  const dispatch = useDispatch();

  const onChange = React.useCallback(
    (val: string) => {
      console.log("Updated Code:", val);
      dispatch(updateCodeValue(val));
      
      if (onCodeChange) {
        onCodeChange(val, currentLanguage);
      }
    },
    [dispatch, onCodeChange, currentLanguage]
  );


  return (
    <CodeMirror
      value={fullCode[currentLanguage]}
      height="80vh"
      className="code-editor"
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
}

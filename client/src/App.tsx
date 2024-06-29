import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Compile from "./pages/Compile";
import Opps from "./pages/Opps";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compile" element={<Compile />} />
          <Route path="/compile/:urlId" element={<Compile />} />
          <Route path="*" element={<Opps />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

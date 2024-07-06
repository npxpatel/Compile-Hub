import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Compile from "./pages/Compile";
import Opps from "./pages/Opps";
import { ThemeProvider } from "@/components/theme-provider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compile" element={<Compile />} />
          <Route path="/compile/:urlId" element={<Compile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<Opps />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

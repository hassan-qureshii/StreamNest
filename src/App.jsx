import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Navbar from "./Components/Navbar/Navbar"; // import your Navbar component

function App() {
  return (
    <>
      {/* Navbar will be shown on all pages */}
      <Navbar />

      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </>
  );
}

export default App;
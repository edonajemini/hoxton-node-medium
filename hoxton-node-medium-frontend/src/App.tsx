import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { SinglePostPage } from "./pages/SinglePostPage";
import { Userdetails } from "./pages/Userdetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts/:id" element={<SinglePostPage />} />
        <Route path="/users/:id" element={<Userdetails />} />
      </Routes>
    </div>
  );
}

export default App;

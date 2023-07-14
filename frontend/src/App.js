import { BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home"
import Chats from "./pages/Chat"
import { Box, Container, Text } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="chats" element={<Chats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
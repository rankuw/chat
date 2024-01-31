import './App.css';
import { Outlet } from "react-router-dom";

import ChatProvider from './context/chatProvider';



function App() {
  console.log("APPPP")
  return (
    <ChatProvider>
      <Outlet/>
    </ChatProvider>
  );
}

export default App;
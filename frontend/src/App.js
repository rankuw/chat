import './App.css';
import { Outlet } from "react-router-dom";

import ChatProvider from './context/chatProvider';



function App() {
  return (
    <ChatProvider>
      <Outlet/>
    </ChatProvider>
  );
}

export default App;
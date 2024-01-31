import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider} from '@chakra-ui/react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Chat from "./pages/Chat"
import Home from "./pages/Home"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/chats",
        element: <Chat />
      }
    ]
  }, 
  
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>  
      <RouterProvider router = {appRouter} />
  </ChakraProvider>
);


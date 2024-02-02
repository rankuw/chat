// import { useContext, createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ChatContext = createContext();

// const ChatProvider = (children) => {
//     const [ user, setUser ] = useState()
//     const [ selectChat, setSelectedChat] = useState()
//     const [ chats, setChats] = useState([])
//     const navigate = useNavigate();
//     useEffect(() => {
//         const userInfo = localStorage.getItem("userInfo")
//         if (!user) navigate("/")
//         setUser(JSON.parse(userInfo))
//     }, [navigate])

//     return (
//         <ChatContext.Provider
//           value={{
//             user,
//             setUser,
//             selectChat,
//             setSelectedChat,
//             chats,
//             setChats
//           }}
//         >
//           {children.children}
//         </ChatContext.Provider>
//       );
// }

// export const ChatState = () => {
//     return useContext(ChatContext);
// };
  
// export default ChatProvider;

import { useState, useEffect, useContext, createContext } from "react"
import { useNavigate } from "react-router-dom"
const ChatContext = createContext()

const ChatProvider = ({children}) => {
    console.log("CHAT provider")
    const [user, setUser] = useState("")
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        console.log("Use effect")
        const userInfo = localStorage.getItem("userInfo")
        console.log(userInfo)
        if (!userInfo) {
            navigate("/")
            return
        }
        console.log("WTFFFFFFFF")
        setUser(JSON.parse(userInfo))
        navigate("/chats")
    }, [])

    return <ChatContext.Provider value={{user, setUser, chats, setChats, currentChat, setCurrentChat}}>
        {children}
    </ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext)
}
export default ChatProvider;
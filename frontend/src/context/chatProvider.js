import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = (children) => {
    const [ user, setUser ] = useState()
    const [ selectChat, setSelectedChat] = useState()
    const [ chats, setChats] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        if (!user) navigate("/")
        setUser(JSON.parse(userInfo))
    }, [navigate])

    return (
        <ChatContext.Provider
          value={{
            user,
            setUser,
            selectChat,
            setSelectedChat,
            chats,
            setChats
          }}
        >
          {children.children}
        </ChatContext.Provider>
      );
}

export const ChatState = () => {
    return useContext(ChatContext);
};
  
export default ChatProvider;
import { Box } from "@chakra-ui/layout";
import {ChatState} from "../../context/chatProvider"
import { getSenderName } from "../../utils/helper"
import { FormControl} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleChat from "../chat/SingleChat"
import io from "socket.io-client"

var socket, selectedChatCompare
const ChatBox = () => {
    const { currentChat, user } = ChatState()
    const [ messages, setMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState()
    const [ socketConnected, setSocketConnected ] = useState(false)
    const [ typing, setTyping ] = useState(false)

    useEffect(() => {
        socket = io("http://localhost:4000")
        socket.emit("setup", user)
        socket.on("connected", () => {setSocketConnected(true)})
        socket.on("typing", () => {setTyping(true); console.log("START TYPINDGGGG")})
        socket.on("stop typing", () => setTyping(false))

    }, [])

    useEffect(() => {
        if(currentChat._id){
            fetchMessages()
        }
        selectedChatCompare = currentChat
    }, [currentChat])

    useEffect(() => {
        socket.on("message received", (newMessage) => {
            console.log("MESAGEEEEEEEEEEE", newMessage)
           
                setMessages([...messages, newMessage])
            
        })
    })
    const sendMessage = async (e) => {
        if (e.key == "Enter" && newMessage){
            try{
                const { data } = await axios.post("/message/", {content: newMessage, chatId: currentChat._id}, {headers: {Authorization: "Bearer " + user.token}})
                setMessages([...messages, data])
                setNewMessage("")
                socket.emit("stop typing", currentChat._id)
                socket.emit('new message', data)
            }catch(err){
                console.log(err)
                return
            }
        }
        return;
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        if(socketConnected){
            socket.emit("typing", currentChat._id)

            setTimeout(() => {
                setTyping(false)
            }, 3000)
        }
    }

    const fetchMessages = async () => {
        try{
            const { data } = await axios.get("/message/" + currentChat._id, {headers: {Authorization: "Bearer " + user.token}})
            setMessages(data)
            socket.emit("join chat", currentChat._id)
        }catch(err){
            console.log("err", err)
        }
    }
    

    return <Box
        w="69%"
        display="flex"
        flexDirection="column"
    >
        <Box display="flex" justifyContent="space-between" p="8px" m="16px">
            {  currentChat._id ?  currentChat.isGroupChat? currentChat.chatName : getSenderName(currentChat.users, user) : "Hello"}
        </Box>

        <Box bg="silver" height="90%">
            {
                <SingleChat messages={messages} />    
            }
        </Box>
        {
            typing ? <div>Typing</div> : <></>
        }
        <FormControl onKeyDown={sendMessage} isRequired>
             <Input onChange={typingHandler} placeholder="Enter your message" value={newMessage}>

             </Input>
        </FormControl>
    </Box>
}

export default ChatBox;
import { Box } from "@chakra-ui/layout";
import {ChatState} from "../../context/chatProvider"
import { getSenderName } from "../../utils/helper"
import { FormControl} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleChat from "../chat/SingleChat"

const ChatBox = () => {
    const { currentChat, user } = ChatState()
    const [ messages, setMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState()
    const sendMessage = async (e) => {
        if (e.key == "Enter" && newMessage){
            try{
                const { data } = await axios.post("/message/", {content: newMessage, chatId: currentChat._id}, {headers: {Authorization: "Bearer " + user.token}})
                setMessages([...messages, data])
                setNewMessage("")
            }catch(err){
                console.log(err)
                return
            }
        }
        return;
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    const fetchMessages = async () => {
        try{
            const { data } = await axios.get("/message/" + currentChat._id, {headers: {Authorization: "Bearer " + user.token}})
            setMessages(data)
        }catch(err){
            console.log("err", err)
        }
    }

    useEffect(() => {
        if(currentChat._id){
            fetchMessages()
        }
    }, [currentChat])
    

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

        <FormControl onKeyDown={sendMessage} isRequired>
             <Input onChange={typingHandler} placeholder="Enter your message" value={newMessage}>

             </Input>
        </FormControl>
    </Box>
}

export default ChatBox;
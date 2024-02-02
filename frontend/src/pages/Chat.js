// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import { ChatState } from '../context/chatProvider'
// import {Box} from "@chakra-ui/react"
// import SideDrawer from "../components/chat/sideDrawer"
// import MyChats from '../components/chat/myChat'
// import Chatbox from '../components/chat/chatbox'
// export default function Chats() {
//   const {user} = ChatState();
//   const [fetchAgain, setFetchAgain] = useState(false);
//   return (
//     <div style={{ width: "100%" }}>
//       {user && <SideDrawer />}
//       <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
//         {user && <MyChats fetchAgain={fetchAgain} />}
//         {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
//       </Box>
//     </div>
//   )
// }
import { ChatState } from "../context/chatProvider"
import { Box } from "@chakra-ui/react"
import SideDrawer from "../components/chat/SideDrawer"
import MyChats from "../components/chat/MyChat"
import ChatBox from "../components/chat/Chatbox"

const Chat = () => {
    const {user} = ChatState()
    return (
        <Box>
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" >
                {user && <MyChats/>}
                {user && (
                    <ChatBox />
                )}
            </Box>
        </Box>
    )
}

export default Chat
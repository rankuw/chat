import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatState } from '../context/chatProvider'
import {Box} from "@chakra-ui/react"
import SideDrawer from "../components/chat/sideDrawer"
import MyChats from '../components/chat/myChat'
import Chatbox from '../components/chat/chatbox'
export default function Chats() {
  const {user} = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats/>}
        {user && <Chatbox/>}
      </Box>
    </div>
  )
}

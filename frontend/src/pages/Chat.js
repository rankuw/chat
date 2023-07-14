import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function Chats() {
  const [chats,setChats] = useState([])
  const fetchChats = async () => {
    try{
      const {data} = await axios.get("/chat")
      console.log(data)
      setChats(data)
    }catch(err){
      console.log(err)
    }
      
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div>
      {
        chats.map((chat) => (
          <div>{chat.chatName}</div>
        ))
      }
    </div>
  )
}

// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// // import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// // import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { Button } from "@chakra-ui/react";
// import { ChatState } from '../../context/chatProvider'
// import { getSenderName } from "../../utils/helper"
// import GroupChatModal from "./GroupChatModal"

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();

//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

//   const toast = useToast();

//   const fetchChats = async () => {
//     // console.log(user._id);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get("/chat", config);
//       console.log("Data from fetch chatsss", data)
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   return (
//     <Box
//       display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       width={{ base: "100%", md: "31%" }}
//       height="100%"
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         display="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         <GroupChatModal>
//           <Button
//             d="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal>
//       </Box>
//       <Box
//         display="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         {chats ? (
//           <Stack overflowY="scroll">
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={selectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSenderName(chat.userIds, loggedUser)
//                     : chat.name}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;

import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../../context/chatProvider";
import { useEffect } from "react";
import axios from "axios";
import { getSenderName } from "../../utils/helper";
import GroupChatModal from "./GroupChatModal";

const MyChats = () => {
    const { chats, setChats, currentChat, setCurrentChat, user } = ChatState()

    const fetchChats = async () => {
        const {data} = await axios.get("/chat", {headers: {authorization: "Bearer " + user.token}})
        setChats(data)
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <Box
            w="30%"
            h="100%"
            bg="blue.100"
            display="flex"
            flexDir="column"
            alignItems="center"
            p={3}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize="30px"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text>My Chats</Text>
                <GroupChatModal>
                    <Button rightIcon={<AddIcon />}>New Group Chat</Button>
                </GroupChatModal>
                
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
            >   
                <Stack>
                    {chats.map((chat) => {
                        return(
                            <Box 
                                display="flex" 
                                p={4}  
                                bg={chat._id == currentChat._id ? "blue" : "orange"}
                                flexDirection="column" 
                                onClick={() => setCurrentChat(chat)}

                            >
                                <Text>
                                    {chat.isGroupChat ? chat.chatName : getSenderName(chat.users, user)}
                                </Text>
                            </Box>
                        )
                    })}
                </Stack>
            </Box>
            
        </Box>
    )
}

export default MyChats;
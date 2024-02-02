// import React, {useState} from 'react'
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Button,
//     useDisclosure,
//     FormControl,
//     Input,
//     useToast,
//     Box,
//   } from "@chakra-ui/react";

// import { ChatState } from '../../context/chatProvider'
// import axios from "axios";
// import UserListItem from "../user/UserList";
// import UserBadgeItem from '../user/UserBadgeItem';

// export default function GroupChatModal({children}) {
//     const {isOpen, onOpen, onClose} = useDisclosure();
//     const [groupChatName, setGroupChatName] = useState();
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [searchResult, setSearchResult] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const toast = useToast();

//     const { user, chats, setChats } = ChatState();

//     const handleSearch = async (query) => {
//         setSearch(query);
//         if (!query) {
//           return;
//         }
    
//         try {
//           setLoading(true);
//           const config = {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           };
//           const {data} = await axios.get(`/user`, config)
//           console.log(data);
//           setLoading(false);
//           setSearchResult(data);
//         } catch (error) {
//           toast({
//             title: "Error Occured!",
//             description: "Failed to Load the Search Results",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//             position: "bottom-left",
//           });
//         }
//       };

//       const handleGroup = (userToAdd) => {
//         if (selectedUsers.includes(userToAdd)) {
//           toast({
//             title: "User already added",
//             status: "warning",
//             duration: 5000,
//             isClosable: true,
//             position: "top",
//           });
//           return;
//         }
    
//         setSelectedUsers([...selectedUsers, userToAdd]);
//       };
//       const handleSubmit = async () => {
//         if (!groupChatName || !selectedUsers) {
//           toast({
//             title: "Please fill all the fields",
//             status: "warning",
//             duration: 5000,
//             isClosable: true,
//             position: "top",
//           });
//           return;
//         }
    
//         try {
//           const config = {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           };
//           const { data } = await axios.post(
//             `/chat/group`,
//             {
//                 groupName: groupChatName,
//               users: JSON.stringify(selectedUsers.map((u) => u._id)),
//             },
//             config
//           );
//           setChats([data, ...chats]);
//           onClose();
//           toast({
//             title: "New Group Chat Created!",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//             position: "bottom",
//           });
//         } catch (error) {
//           toast({
//             title: "Failed to Create the Chat!",
//             description: error.response.data,
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//             position: "bottom",
//           });
//         }
//       };

//     const handleDelete = (delUser) => {
//         setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
//       };

//     return (
//         <>
//           <span onClick={onOpen}>{children}</span>
    
//           <Modal onClose={onClose} isOpen={isOpen} isCentered>
//             <ModalOverlay />
//             <ModalContent>
//               <ModalHeader
//                 fontSize="35px"
//                 fontFamily="Work sans"
//                 d="flex"
//                 justifyContent="center"
//               >
//                 Create Group Chat
//               </ModalHeader>
//               <ModalCloseButton />
//               <ModalBody d="flex" flexDir="column" alignItems="center">
//                 <FormControl>
//                   <Input
//                     placeholder="Chat Name"
//                     mb={3}
//                     onChange={(e) => setGroupChatName(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <Input
//                     placeholder="Add Users eg: John, Piyush, Jane"
//                     mb={1}
//                     onChange={(e) => handleSearch(e.target.value)}
//                   />
//                 </FormControl>
//                 <Box w="100%" d="flex" flexWrap="wrap">
//                   {selectedUsers.map((u) => (
//                     <UserBadgeItem
//                       key={u._id}
//                       user={u}
//                       handleFunction={() => handleDelete(u)}
//                     />
//                   ))}
//                 </Box>
//                 {loading ? (
//                   // <ChatLoading />
//                   <div>Loading...</div>
//                 ) : (
//                   searchResult
//                     ?.slice(0, 4)
//                     .map((user) => (
//                       <UserListItem
//                         key={user._id}
//                         user={user}
//                         handleFunction={() => handleGroup(user)}
//                       />
//                     ))
//                 )}
//               </ModalBody>
//               <ModalFooter>
//                 <Button onClick={handleSubmit} colorScheme="blue">
//                   Create Chat
//                 </Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>
//         </>
//       );
// }

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import UserList from "../user/UserList";
import UserBadgeItem from "../user/UserBadgeItem";
import { ChatState } from "../../context/chatProvider";

const GroupChatModal = ({children}) => {
    const { setChats, chats, user } = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ groupName, setGroupName ] = useState()
    const [ userQuery, setUserQuery ] = useState()
    const [ searchResult, setSearchResult ] = useState([])
    const [ selectedUsers, setSelectedUsers ] = useState([])
    const toast = useToast()
    const searchUser = async () => {
        const {data} = await axios.get("/user?name=" + userQuery)
        setSearchResult(data)
    }

    const selectUser = (user) => {
        if (selectedUsers.filter((u) => {return u._id == user._id}).length >= 1){
            toast({
                title: 'User already selected',
                description: "Same user not allowed",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return;
        }
        setSelectedUsers([...selectedUsers, user])
        setSearchResult(searchResult.filter(u => {return user._id != u._id}))
    }

    const handleClose = (user) => {
        setSelectedUsers(selectedUsers.filter(u => {return u._id != user._id}))
    }

    const createGroup = async () => {
        if(!groupName || selectedUsers.length <= 2){
            toast({
                title: 'Can not create group',
                description: "Not allowed",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return
        }
        const { data } = await axios.post("/chat/group", {chatName: groupName, users: selectedUsers}, {headers: {Authorization: "Bearer " + user.token}})
        setChats([data, ...chats])
        setGroupName("")
        setSelectedUsers([])
        onClose()
    }

    return(
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose} isCentered="true" size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="40px">Create Group Chat</ModalHeader>
                    <ModalBody>
                        <Input placeholder="Enter Chat Name" my="6px" value={groupName} onChange={(e) => {setGroupName(e.target.value)}}></Input>
                        <Input placeholder="Enter User to add" my="6px" value={userQuery} onChange={
                            (e) => {
                                setUserQuery(e.target.value)
                                searchUser(e.target.value)
                            }
                        }></Input>
                        {
                            selectedUsers.map((user) => {
                                return <UserBadgeItem user={user} func={() => handleClose(user)}/>
                            })
                        }
                        {
                            searchResult.slice(0, 4).map((user) => {
                                return <UserList user={user} func={() => selectUser(user)}></UserList>
                            })
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="blue.400" onClick={createGroup}>Create Group</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
        
    )
}

export default GroupChatModal;
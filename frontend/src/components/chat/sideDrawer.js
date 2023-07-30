import React, {useState} from 'react'
import { Box, Tooltip, Text, Button, Menu, MenuButton, MenuList, Avatar, MenuItem, Drawer, DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Spinner } from '@chakra-ui/react'
import {Search2Icon, BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { ChatState } from '../../context/chatProvider'
import Profilemodal from './profilemodal'
import { useNavigate } from "react-router-dom";
import ChatLoading from './ChatLoading'
import UserListItem from '../user/UserList'
import axios from 'axios'
export default function SideDrawer() {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const {user, selectChats, setSelectChats, selectedChat, setSelectedChat} = ChatState()
  const navigate = useNavigate()

  const {isOpen, onOpen, onClose} = useDisclosure()
  const logOutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const handleSearch = async () => {
    try{
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`/user`, config)
      console.log(data)
      setLoading(false);
      setSearchResult(data);
    }catch(err){
      console.log(err)
    }

  } 

  const accessChat = async (userId) => {
    setLoadingChat(true)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    console.log(userId)
    const {data} = await axios.post("/chat", {userId}, config)
    setSelectedChat(data)
    setLoadingChat(false)
    onClose()
  } 

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Search2Icon/>
            <Text display={{base: "none", md: "flex"}} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans" width="10%">
          UChat
        </Text>

        <div>
          <Menu>
            <MenuButton>
              <BellIcon fontSize="2xl" margin={1}/>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar 
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <Profilemodal user={user}>
                <MenuItem>View Profile</MenuItem>
              </Profilemodal>
              
              <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>

      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
            </Box>
            {
              loading ? (
                <ChatLoading/>
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )
            }
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

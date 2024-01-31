import { Container, Center, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading } from "@chakra-ui/react"
import Login from "../components/authentication/logIn"
import SignUp from "../components/authentication/signUp"
import { useEffect } from "react"
import { ChatState } from "../context/chatProvider"
import { useNavigate } from "react-router-dom"

const Home = () => {
  console.log("HOMEEEEEE")
    const {setUser} = ChatState()
    const navigate = useNavigate()
    useEffect(() => {
      const userInfo = localStorage.getItem("userInfo")
      if (userInfo) navigate("/chats")
      setUser(JSON.parse(userInfo))
    }, [])
    return (
        <Container maxW="2xl">
          <Center p={3} bg="white" margin="40px 0 15px 0" borderWidth="1px" w="100%" borderRadius="lg">
            <Heading>UChat</Heading>
          </Center>
          <Box w="100%" borderWidth="1px" borderColor="black.100" borderRadius="lg" p="16px" margin="30px 0px">
            <Tabs variant='soft-rounded'>
            <TabList>
              <Tab width="50%">LogIn</Tab>
              <Tab width="50%">SignIn</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <SignUp/>
              </TabPanel>
            </TabPanels>
          </Tabs>
          </Box>
        </Container>
    )
}

export default Home;
import React from 'react'
import { Container, Center, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react'
import SignUp from '../components/authentication/signUp'
import LogIn from '../components/authentication/logIn'
export default function Home() {
  return (
    <Container maxW="xl"  centerContent>
      <Center  p={3} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
        <Text fontSize="4xl"> UChat </Text>
      </Center>
      <Box p={4} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' colorScheme='blue'>
          <TabList mb="1em">
            <Tab w="50%">Sign Up</Tab>
            <Tab w="50%">Log In</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp/>
            </TabPanel>
            <TabPanel>
              <LogIn/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

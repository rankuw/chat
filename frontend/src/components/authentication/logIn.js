import React, {useState} from 'react'
import { InputGroup, VStack, useToast } from '@chakra-ui/react'
import { Input, InputRightElement, Button } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LogIn() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const toast = new useToast()
  const navigate = new useNavigate()

  const handleClick = () => {
      setShow(!show)
  }
  const loginHandler = async () => {
    try{
        if(!email || !password){
            toast({
                title: "Can't process the request.",
                description: "Not all details are filled.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            return
        }
        const {data} = await axios.post("/user/logIn", {email, password}, 
            {
                headers: {
                    "Content-type": "application/json",
                }
            }
        )
        console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        toast({
            title: "Welcome to the app.",
            description: "User logged in successfully.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        navigate("/chat")
    }catch(err){
        console.log(err)
        toast({
            title: "Sorry an error occurred",
            description: "Try agin later",
            status: 'warning',
            duration: 5000,
            isClosable: true,
        })
    }
  }
  return (
    <VStack>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input 
                type='email'
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button colorScheme='blue' minW="100%" mt="15px" onClick={loginHandler}>Log In</Button>
        <Button colorScheme='orange' minW="100%" mt="15px">Forgot Password</Button>
      </VStack>
  )
}

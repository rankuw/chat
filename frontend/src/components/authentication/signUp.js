import { InputGroup, VStack, useToast } from '@chakra-ui/react'
import { Input, InputRightElement, Button } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const toast = useToast();
    const navigate = useNavigate();

    const [show, setShow] = useState(false)

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false)

    const onClickHandler = async () => {
        try{
            setPicLoading(true)
            if (!name || !email | !password | !confirmPassword){
                toast({
                    title: "Can't process the request.",
                    description: "Not all details are filled.",
                    status: 'warning',
                    duration: 5000,
                    isClosable: true
                })
                setPicLoading(false)
                return
            }
            if (password !== confirmPassword){
                toast({
                    title: "Warning",
                    description: "Both the passwords should be the same",
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
                setPicLoading(false)
                return
            }
            const {data} = await axios.post("/user/signUp", {name, email, password}, {
                headers: {
                "Content-type": "application/json",
                }
            })
            console.log(data)
            localStorage.setItem("userInfo", JSON.stringify(data))
            setPicLoading(false)
            toast({
                title: "Welcome to the app.",
                description: "User created successfully.",
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
    const handleClick = () => {
        setShow(!show)
    }
    return (
        <VStack>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
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
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Upload your picture</FormLabel>
                <InputGroup>
                    <Input
                        type="file"
                        p={1.5}
                        accept='image/*'
                    />
                </InputGroup>
            </FormControl>
            <Button colorScheme='blue' minW="100%" mt="15px" isLoading={picLoading} onClick={onClickHandler}>SignUp</Button>
        </VStack>
    )
}

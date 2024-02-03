import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const toast = useToast()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const signUp = async () => {
        if (!name || !email || !password || !confirmPassword){
            toast({
                title: 'Missing details',
                description: "Details are missing...",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }
        const {data} = await axios.post("/user/signUp", {
            name, email, password
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
        toast({
            title: "Welcome to the app.",
            description: "User created successfully.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })

        navigate("/chats")
    }
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <VStack>
            <FormControl isRequired>
                <FormLabel color="blackAlpha.900">Name</FormLabel>
                <Input value={name} placeholder="Enter your name" onChange={
                    (e) => {
                        setName(e.target.value)
                    }
                }/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel color="blackAlpha.900">Email</FormLabel>
                <Input value={email} placeholder="Enter your email" onChange={
                    (e) => {
                        setEmail(e.target.value)
                    }
                }/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel color="blackAlpha.900">Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={password}
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={togglePassword}>
                        {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel color="blackAlpha.900">Confirm Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={confirmPassword}
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                            }
                        }
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={togglePassword}>
                        {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button bg="blue.200" w="100%" onClick={signUp}>
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp;
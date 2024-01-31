import { FormControl, VStack, FormLabel, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ChatState } from "../../context/chatProvider"

const Login = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const {user, setUser} = ChatState()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const login = async () => {
        if (!email || !password){
            toast({
                title: 'Missing details',
                description: "Details are missing...",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }
        const {data} = await axios.post("/user/login", {
            email, password
        }
        ) 

        localStorage.setItem("userInfo", JSON.stringify(data))
        toast({
            title: "Welcome to the app.",
            description: "User created successfully.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        setUser(data)
        navigate("/chats")
    }
    return (
        <VStack gap={4}>
            <FormControl isRequired>
                <FormLabel color="blackAlpha.900">Email</FormLabel>
                <Input placeholder='Enter your email' value={email} onChange = {
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
            <Button bg="blue.200" w="100%" onClick={login}>
                Login
            </Button>
        </VStack>
    )
}

export default Login
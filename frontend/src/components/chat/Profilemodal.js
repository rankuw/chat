// import React from 'react'
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
//     IconButton,
//     Text,
//     Image,
//   } from "@chakra-ui/react"

// export default function Profilemodal({user, children}) {
//     const {isOpen, onOpen, onClose} = useDisclosure()
//   return (
//     <>
//         {
//             children ? (
//                 <span onClick={onOpen}>{children}</span>
//             ): (
//                 <IconButton/>
//             )
//         }

//         <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
//             <ModalOverlay />
//             <ModalContent h = "410px">
                
//                 <ModalHeader
//                     fontSize="40px"
//                     fontFamily="Work sans"
//                     display="flex"
//                     justifyContent="center"
//                 >
//                     {user.name}
//                 </ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody
//                     display="flex"
//                     flexDir="column"
//                     alignItems="center"
//                     justifyContent="space-between"
//                 >
//                     <Image
//                         borderRadius="full"
//                         boxSize="150px"
//                         src={user.pic}
//                         alt={user.name}
//                     />
//                     <Text
//                         fontSize={{ base: "28px", md: "30px" }}
//                         fontFamily="Work sans"
//                     >
//                         Email: {user.email}
//                     </Text>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button onClick={onClose}>Close</Button>
//                 </ModalFooter>
//             </ModalContent>
//         </Modal>
//     </>
//   )
// }

import { IconButton, useDisclosure, Image } from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {children ? <span onClick={onOpen}>{children}</span> : <IconButton icon={<ViewIcon/>}/>}

            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="xl">
                <ModalOverlay />
                <ModalContent h="450px">
                    <ModalHeader display="flex" justifyContent="center" fontSize="40px">{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" justifyContent="space-between" flexDirection="column" alignItems="center" >
                        <Image
                            borderRadius="full"
                            boxSize="200px"
                            src="https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        />
                        <Text fontSize="30px">Email: {user.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal
// import { Box } from "@chakra-ui/layout";
// import "./style.css";
// import SingleChat from "./SingleChat";
// import { ChatState } from "../../context/chatProvider";

// const Chatbox = ({ fetchAgain, setFetchAgain }) => {
//   const { selectedChat } = ChatState();

//   return (
//     <Box
//       d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
//       alignItems="center"
//       flexDir="column"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "68%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//     </Box>
//   );
// };

// export default Chatbox;

import { Box } from "@chakra-ui/layout";
const ChatBox = () => {
    return <Box
        bg="blue"
        w="69%"
    >
        Chat Box
    </Box>
}

export default ChatBox;
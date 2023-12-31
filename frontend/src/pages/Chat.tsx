import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import MessageList from "containers/MessageList";
import { useEffect, useState } from "react";
import { MessageInfo, MessageType, SenderType } from "components/Message";
import { ChatInput } from "components";
import axios from "../utils/axiosConfig";

/**
 * Some stupid texting messages used for displaying what a possible frontend
 * could look like. These are non-functional and will be removed.
 *
 * TODO: Delete this.
 */
const TESTING_MESSAGES: Array<MessageInfo> = [
  {
    id: 0,
    type: MessageType.TEXT,
    sender: SenderType.USER,
    content: "Testing 1",
    loading: false,
  },
  {
    id: 1,
    type: MessageType.TEXT,
    sender: SenderType.AI,
    content: "Testing 12",
    loading: false,
  },
  {
    id: 2,
    type: MessageType.TEXT,
    sender: SenderType.USER,
    content: "Testing 123",
    loading: false,
  },
  {
    id: 3,
    type: MessageType.TEXT,
    sender: SenderType.USER,
    content: "Testing 1234",
    loading: false,
  },
  {
    id: 4,
    type: MessageType.TEXT,
    sender: SenderType.AI,
    content: "Testing 12345",
    loading: false,
  },
];

const INITIAL_MESSAGE: Array<MessageInfo> = [
  {
    id: 0,
    type: MessageType.TEXT,
    sender: SenderType.AI,
    content: "Enter a prompt for an image you would like to generate",
    loading: false,
  }
];

/**
 * The main interactive page for the app. Presents the user with a familiar
 * chat interface, allowing them to send and receive messages with a
 * AI chat bot, oriented around generating prompts for images.
 */
function Chat() {
  const [messages, setMessages] =
    useState<Array<MessageInfo>>(INITIAL_MESSAGE);
  let nextId = messages.length + 1;

  const [chatId, setChatId] = useState<string | null>(null);
  const [current_history, setHistory] = useState<string>("");

  useEffect(() => {
    // Check if there's a chatId in session storage
    const storedChatId = sessionStorage.getItem("chatId");
    if (storedChatId) {
      setChatId(storedChatId);
      // TODO: Fetch messages for this chatId from the backend
    } else {
      // Call the /start_chat endpoint to start a new chat
      axios
        .post("/start_chat")
        .then((response) => {
          const newChatId = response.data.chat_id;
          setChatId(newChatId);
          sessionStorage.setItem("chatId", newChatId);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, []);

  // Append a message to the front from the sent user, using the text from input
  const sendMessage = (input: string) => {
    const info: MessageInfo = {
      id: nextId,
      type: MessageType.TEXT,
      sender: SenderType.USER,
      loading: false,
      content: input,
    };
    nextId += 1;

    setMessages((prev) => [info, ...prev]);

    axios
      .post("/conversation", { message: input, history: current_history })
      .then((response) => {
        if (response.data.message == 'Image generated successfully') {
          setHistory("");
          const newMessage: MessageInfo = {
            id: nextId,
            type: MessageType.IMAGE,
            sender: SenderType.AI,
            loading: false,
            content: response.data.image_url,
          };
          nextId += 1;
          const newMessage2: MessageInfo = {
            id: nextId,
            type: MessageType.TEXT,
            sender: SenderType.AI,
            loading: false,
            content: "Enter another prompt if you would like"
          }
          setMessages((prev) => [newMessage, ...prev]);
          setMessages((prev) => [newMessage2, ...prev]);
        } else {
          setHistory(response.data.updated_history)
          const newMessage: MessageInfo =  {
            id: nextId,
            type: MessageType.TEXT,
            sender: SenderType.AI,
            content: response.data.message,
            loading: false,
          };
          setMessages((prev) => [newMessage, ...prev]);
        }
        nextId += 1;
      })
      .catch((error) => {
        console.error("Error:", error);
        setHistory("");
        const errorMessage: MessageInfo = {
          id: nextId,
          type: MessageType.TEXT,
          sender: SenderType.AI,
          loading: false,
          content: "An error occurred. Enter another prompt if you would like",
        };
        nextId += 1;
        setMessages((prev) => [errorMessage, ...prev]);
      });
  };

  return (
    <Stack
      maxWidth="750px"
      maxHeight="100%"
      mx="auto"
      h="full"
      flexDirection="column"
    >
      <MessageList
        width="full"
        mt="auto"
        justifyContent="flex-start"
        overflow="scroll"
        messages={messages}
      />
      <Box width="full">
        <ChatInput mb="4" onSend={sendMessage} />
      </Box>
    </Stack>
  );
}

export default Chat;

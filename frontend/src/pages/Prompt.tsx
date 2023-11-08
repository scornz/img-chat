import React from "react";

import { Box, Stack } from "@chakra-ui/react";
import MessageList from "containers/MessageList";
import { useEffect, useState } from "react";
import { MessageInfo, MessageType, SenderType } from "components/Message";
import { ChatInput } from "components";
import axios from "../utils/axiosConfig";

/**
 * TODO: Improve this.
 */
const TESTING_MESSAGES: Array<MessageInfo> = [
  {
    id: 0,
    type: MessageType.TEXT,
    sender: SenderType.AI,
    content: "Enter a prompt for an image you would like to generate",
    loading: false,
  },
];

/**
 * The main interactive page for the app. Presents the user with a familiar
 * chat interface, allowing them to send and receive messages with a
 * AI chat bot, oriented around generating prompts for images.
 */
function Prompt() {
  const [messages, setMessages] =
    useState<Array<MessageInfo>>(TESTING_MESSAGES);
  let nextId = messages.length + 1;

  const [chatId, setChatId] = useState<string | null>(null);

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
      .post("/test_generate_image", { prompt: input })
      .then((response) => {
        const newMessage: MessageInfo = {
          id: nextId,
          type: MessageType.IMAGE,
          sender: SenderType.AI,
          loading: false,
          content: response.data.image_url,
        };
        nextId += 1;
        setMessages((prev) => [newMessage, ...prev]);
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorMessage: MessageInfo = {
          id: nextId,
          type: MessageType.TEXT,
          sender: SenderType.AI,
          loading: false,
          content: "Image generation failed.",
        };
        nextId += 1;

        setMessages((prev) => [errorMessage, ...prev]);
      });
  };

  return (
    <Stack
      maxWidth="750px"
      maxHeight="100vh"
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

export default Prompt;

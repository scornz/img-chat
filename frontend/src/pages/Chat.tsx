import { Box, Stack } from "@chakra-ui/react";
import MessageList from "containers/MessageList";
import { useState } from "react";
import { MessageInfo, MessageType, SenderType } from "components/Message";
import { ChatInput } from "components";

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

/**
 * The main interactive page for the app. Presents the user with a familiar
 * chat interface, allowing them to send and receive messages with a
 * AI chat bot, oriented around generating prompts for images.
 */
function Chat() {
  const [messages, setMessages] =
    useState<Array<MessageInfo>>(TESTING_MESSAGES);

  let nextId = messages.length + 1;

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

export default Chat;

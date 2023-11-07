import { Box, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from "@chakra-ui/react";
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

  const bg_colors = useColorModeValue(
    ['teal.50', 'orange.50', 'purple.50'],
    ['teal.900', 'orange.900', 'purple.900'],
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = bg_colors[tabIndex];

  return (
      <Tabs 
        variant='soft-rounded' 
        colorScheme='green'
        //onChange={(index) => setTabIndex(index)} bg={bg}
        h="100%"
        mt="1vh"
        overflow="hidden"
      >
        <TabList 
          justifyContent="center"
        >
          <Tab>Conversational</Tab>
          <Tab>Single Prompt</Tab>
          <Tab>Help</Tab>
        </TabList>

        <TabPanels
          h="95vh"
        >
          <TabPanel
            height="100%"
            >

            <Stack
              maxWidth="750px"
              maxHeight="100%"
              mx="auto"
              h="full"
              flexDirection="column"
              flex="1"
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

          </TabPanel>
          <TabPanel>
            <p>Single prompt page</p>
          </TabPanel>
          <TabPanel>
            <p>Help page</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
  );
}

export default Chat;

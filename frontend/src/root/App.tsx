import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  ChakraProvider,
  Flex,
  Tabs,
  TabList,
  Box,
  Tab,
} from "@chakra-ui/react";

import Chat from "pages/Chat";
import Prompt from "pages/Prompt";

function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <Router>
        <ChakraProvider>
          <Flex direction="column" h="100vh" pt="20px">
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList justifyContent="center">
                <Tab as={Link} to="/chat">
                  Conversational
                </Tab>
                <Tab as={Link} to="/prompt">
                  Single Prompt
                </Tab>
                <Tab as={Link} to="/help">
                  Help
                </Tab>
              </TabList>
            </Tabs>

            <Box flex="1" width="100%">
              <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/prompt" element={<Prompt />} />
                <Route path="/help" element={<p>Help page</p>} />
              </Routes>
            </Box>
          </Flex>
        </ChakraProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;

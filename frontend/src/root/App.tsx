import {
  createHashRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

import { ChakraProvider } from "@chakra-ui/react";

// Pages
import Chat from "pages/Chat";

/* We use a hash router to take advantage of GitHub pages. GitHub pages uses
server-side routing, so we need this. */
const router = createHashRouter([
  {
    element: (
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    ),
    children: [
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
    errorElement: <Navigate to="/chat" />,
  },
]);

/**
 * Root component for the app. Organizes navigation and initializes global
 * state (using Recoil/Nexus).
 */
function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

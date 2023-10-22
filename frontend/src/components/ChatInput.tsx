import { useState } from "react";

import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from "@chakra-ui/react";

type Props = {
  onSend: (input: string) => void;
};

/**
 * A specialized input that is designed for sending messages. Combines a button
 * with a standard text input, and responds by either a direct click or by
 * clicking the enter key. This clears the input and induces a callback function.
 */
function ChatInput({ onSend, ...props }: Props & InputGroupProps) {
  // The contents of the text input
  const [input, setInput] = useState("");

  // Induce callback and clear input
  const send = () => {
    onSend(input);
    setInput("");
  };

  return (
    <InputGroup variant="filled" {...props}>
      <Input
        borderRadius="full"
        focusBorderColor="gray.100"
        placeholder="Say something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
      />
      <InputRightElement>
        <Button borderRadius="full" onClick={send}>
          <Icon as={ArrowUpIcon} color="green.400" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export { ChatInput };

import { Message } from "components";
import { MessageInfo, SenderType } from "components/Message";

import { Stack, StackProps } from "@chakra-ui/react";
import { MotionBox } from "elements";

type Props = {
  messages: Array<MessageInfo>;
};

/**
 * Container for a list of sent or received messages. Animates the list
 * according to number of messages.
 */
function MessageList({ messages, ...props }: Props & StackProps) {
  return (
    <Stack flexDirection="column-reverse" {...props}>
      {messages.map((m, i) => (
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.2 },
            layout: {
              type: "spring",
              bounce: 0.4,
              duration: i * 0.09 + 0.4,
            },
          }}
          key={m.id}
          layout
          style={{
            originX: m.sender === SenderType.USER ? 1 : 0,
          }}
        >
          <Message message={m} index={i} />
        </MotionBox>
      ))}
    </Stack>
  );
}

export default MessageList;

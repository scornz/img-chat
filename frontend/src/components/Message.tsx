import { Box, Text } from "@chakra-ui/react";

/**
 * Types of messages sent by either user or AI.
 */
export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
}

/**
 * Which entity sent a given message.
 */
export enum SenderType {
  USER = "user",
  AI = "ai",
}

/**
 * A single message entity. Describes who the message was sent by, its content,
 * its type, its ordering, and its status
 */
export type MessageInfo = {
  /**
   * Unique identifier used for maintaining order when modifying/inserting items
   * into the dynamic list.
   */
  id: number;
  /**
   * The type of the message (image, text, etc.)
   */
  type: MessageType;
  /**
   * Who sent this message? Determines styling, alignment, and interaction
   * mechanics for this given message.
   */
  sender: SenderType;
  /**
   * The loading status of the message, affects appeareance and interactive state
   * if this is true.
   */
  loading: boolean;
  /**
   * The content of the message. This can change depending on the type of message
   * that is being sent.
   */
  content: string;
};

type Props = {
  message: MessageInfo;
  index?: number;
};

/**
 * A rounded box that contains information regarding a sent or received message.
 * This can contain text or images depending on the type. This message will
 * be aligned within a page-width div, either to the right or left, depending
 * on whether or not it was sent or received by the user.
 */
function Message({ message, index = 0 }: Props) {
  const senderStyle =
    message.sender === SenderType.USER
      ? { ml: "auto", backgroundColor: "blue.500" }
      : { mr: "auto", backgroundColor: "gray.500" };

  return (
    <Box
      borderRadius="3xl"
      padding="10px"
      maxWidth="60%"
      width="fit-content"
      textColor="white"
      display="block"
      {...senderStyle}
    >
      <Text>{message.content}</Text>
    </Box>
  );
}

export { Message };

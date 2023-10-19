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
};

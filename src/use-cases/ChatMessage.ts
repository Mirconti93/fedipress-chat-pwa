import { MessageContentType, MessageDirection, MessageStatus } from "./enums";
import { MessageContent } from "./interfaces/MessageContent";
import { ChatMessageId } from "./Types";

export type ChatMessageParams<T extends MessageContentType> = {
  id: ChatMessageId;
  status: MessageStatus;
  contentType: T;
  senderId: string;
  receiverId: string;
  direction: MessageDirection;
  content: MessageContent<T>;
  createdTime?: Date;
  updatedTime?: Date;
};

export class ChatMessage<T extends MessageContentType> {
  id: ChatMessageId;
  status: MessageStatus;
  contentType: MessageContentType;
  senderId: string;
  receiverId: string;
  direction: MessageDirection;
  content: MessageContent<T>;
  createdTime: Date;
  updatedTime?: Date;

  constructor({
    id,
    status,
    contentType,
    senderId,
    receiverId,
    direction,
    content,
    createdTime = new Date(),
    updatedTime,
  }: ChatMessageParams<MessageContentType>) {
    this.id = id;
    this.status = status;
    this.contentType = contentType;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.direction = direction;
    this.content = content;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
  }
}

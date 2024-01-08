import { ChatEventType, MessageContentType } from "../enums";
import { ChatEvent } from "./ChatEvent";
import { ConversationId } from "../Types";
import { ChatMessage } from "../ChatMessage";

export type DeleteMessageEventParams<T extends MessageContentType> = {
  message: ChatMessage<MessageContentType>;
  conversationId: ConversationId;
};

export class DeleteMessageEvent implements ChatEvent<ChatEventType.DeleteMessage> {
  readonly type = ChatEventType.DeleteMessage;
  message: ChatMessage<MessageContentType>;
  conversationId: ConversationId;

  constructor({
    message,
    conversationId,
  }: DeleteMessageEventParams<MessageContentType>) {
    this.message = message;
    this.conversationId = conversationId;
  }
}

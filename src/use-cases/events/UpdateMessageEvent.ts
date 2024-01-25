import { ChatEventType, MessageContentType } from "../enums";
import { ChatEvent } from "./ChatEvent";
import { ConversationId } from "../Types";
import { ChatMessage } from "../ChatMessage";

export type UpdateMessageEventParams = {
  message: ChatMessage<MessageContentType>;
  conversationId: ConversationId;
};

export class UpdateMessageEvent implements ChatEvent<ChatEventType.UpdateMessage> {
  readonly type = ChatEventType.UpdateMessage;
  message: ChatMessage<MessageContentType>;
  conversationId: ConversationId;

  constructor({
    message,
    conversationId,
  }: UpdateMessageEventParams) {
    this.message = message;
    this.conversationId = conversationId;
  }
}

import { useEffect, useState } from "react";
import { ChatMessage, Conversation, MessageContent, MessageContentType, MessageDirection } from "../use-cases";
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";
import { ConversationHeader, Message } from "@chatscope/chat-ui-kit-react";



interface ConversationsProps {
  conversations: Array<Conversation>;
  handleClick: (id: String) => void;
}

const Conversations: React.FC<ConversationsProps> = ({conversations, handleClick}) => {
    

    return (
      <Col>
        {conversations.map((conversation, index) => (
          
        
          
          <Card>
            <CardTitle>
              {conversation.id}
            </CardTitle>
            <CardBody>
              {conversation.description}
            </CardBody>
            
        
          </Card>
        
       ))}
      </Col>
    );
  };

export default Conversations;  
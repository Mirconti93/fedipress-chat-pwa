import { useEffect, useState } from "react";
import { ChatMessage, MessageContent, MessageContentType, MessageDirection } from "../use-cases";
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";
import { Message } from "@chatscope/chat-ui-kit-react";



interface ConversationsProps {
  senderId: String;
  handleClick: (id: String) => void;
}

const Conversations: React.FC<ConversationsProps> = ({senderId, handleClick}) => {
    console.log('message:' + senderId);

    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        async function loadConversations() {
            const response = await fetch('/wp-json/wp/v2/posts');
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
    
            const conversations = await response.json();
            setConversations(conversations);
        }
    
        loadConversations();
   }, [])

    return (
      <Col>
        {conversations.map((conversation, index) => (
        
          <Card>
            
                  <CardTitle
                      color="textSecondary"
                      dangerouslySetInnerHTML={{__html: conversation}} />
                  <p>m</p>
          </Card>
        
       ))}
      </Col>
    );
  };

export default Conversations;  
import { useEffect, useState } from "react";
import { ChatMessage, MessageContent, MessageContentType, MessageDirection } from "../use-cases";
import { Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";
import { ConversationHeader, Message } from "@chatscope/chat-ui-kit-react";



interface ConversationsProps {
  senderId: String;
  handleClick: (id: String) => void;
}

const Conversations: React.FC<ConversationsProps> = ({senderId, handleClick}) => {
    console.log('message:' + senderId);

    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        async function loadConversations() {
            const response = await fetch('https://www.lightonmatter.it/wp-json/wp/v2/comments');
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
    
            const conversationList = await response.json();
            setConversations(conversationList);

            console.log(conversations)
        
        }
    
        loadConversations();
   }, [])

  

    return (
      <Col>
        {conversations.map((conversation, index) => (
          
          
          <Card>
            <CardTitle>
              {JSON.parse(JSON.stringify(conversation)).author}
            </CardTitle>
            <CardBody>
           
            </CardBody>
            
        
          </Card>
        
       ))}
      </Col>
    );
  };

export default Conversations;  
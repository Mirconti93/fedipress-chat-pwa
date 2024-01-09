import { useState } from "react";
import { ChatMessage, MessageContentType, MessageDirection } from "../use-cases";
import { Row } from "react-bootstrap";
import { Message } from "@chatscope/chat-ui-kit-react";



interface ExtendedMessageProps {
  message: ChatMessage<MessageContentType>;
  handleEdit: () => void;
  handleDelete: (message: ChatMessage<MessageContentType>) => void;
}

const ExtendedMessage: React.FC<ExtendedMessageProps> = ({message, handleEdit, handleDelete}) => {
    console.log('message:' + message.id);

    const [popupIsOpen, setPopupIsOpen] = useState(false);

    console.log('popupIsOpen:' + popupIsOpen + 'message direction:' + message.direction);

    return (
      <Row className="message-row">
        {popupIsOpen && message.direction === MessageDirection.Incoming && <div className="popup">
          <div >
              <p><span className="close" onClick={()=>{setPopupIsOpen(false)}}>
              &times;
              </span></p>
              <button className="popup-button" onClick={(e) => handleEdit}>Edit</button>
              <button className="popup-button" onClick={(e) => handleDelete(message)}>Delete</button>

          </div>
        </div>}

          <Message key={message.id} model={{
                              type: "html",
                              payload: message.content,
                              direction: message.direction,
                              position: "normal"
                          }} onClick={()=>setPopupIsOpen(true)}/>        

      </Row>

    );
  };

export default ExtendedMessage;  
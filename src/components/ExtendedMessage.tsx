import { useState } from "react";
import { ChatMessage, MessageContent, MessageContentType, MessageDirection } from "../use-cases";
import { Col, Row } from "react-bootstrap";
import { Message } from "@chatscope/chat-ui-kit-react";



interface ExtendedMessageProps {
  message: ChatMessage<MessageContentType>;
  handleEdit: (message: ChatMessage<MessageContentType>) => void;
  handleDelete: (message: ChatMessage<MessageContentType>) => void;
}

const ExtendedMessage: React.FC<ExtendedMessageProps> = ({message, handleEdit, handleDelete}) => {
    console.log('message:' + message.id);

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(message.content as unknown as string);

    console.log('popupIsOpen:' + popupIsOpen + 'message direction:' + message.direction);

    return (
      <Row className="message-row">
        {popupIsOpen && message.direction === MessageDirection.Incoming && <div className="popup">
          <div >
              <Row><span className="close" onClick={()=>{
                setEditMode(false)
                setPopupIsOpen(false)}}>
              &times;
              </span></Row>
              <Row>
                <button className="popup-button" onClick={(e) => setEditMode(true)}>Edit</button>
              </Row>
              <Row>
                <button className="popup-button" onClick={(e) => handleDelete(message)}>Delete</button>
              </Row>
          </div>
        </div>}

        {editMode ? (<div>
            <div className="textarea-container">
              <textarea className="edit-text" value={editedContent} onChange={e => setEditedContent(e.target.value)}></textarea>
              <button className="button-inside-textarea cs-button cs-button--send" onClick={(e)=>{
                message.content = editedContent as unknown as MessageContent<string>
                handleEdit(message)
                setEditMode(false)
                setPopupIsOpen(false)}
                }>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" className="svg-inline--fa fa-paper-plane fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg></button>
            </div>
          </div>): 
          (<Message key={message.id} model={{
              type: "html",
              payload: message.content,
              direction: message.direction,
              position: "normal"
          }} onClick={()=>setPopupIsOpen(true)}/>) 
        }

      </Row>

    );
  };

export default ExtendedMessage;  
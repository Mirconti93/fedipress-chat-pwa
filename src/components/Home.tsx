
import {nanoid} from "nanoid";
import {Col, Container, Row} from "react-bootstrap";
import {Footer} from "./Footer";
import { ChangeEvent, FormEvent, useState } from "react";
import { AutoDraft, BasicStorage, ChatMessage, ChatProvider, IStorage, MessageContentType, Presence, UpdateState, User, UserStatus } from "../use-cases";
import { akaneModel, eliotModel, emilyModel, joeModel } from "../data/data";
import { Chat } from "./Chat";
import { FediChatService } from "../use-cases/services";

// sendMessage and addMessage methods can automagically generate id for messages and groups
// This allows you to omit doing this manually, but you need to provide a message generator
// The message id generator is a function that receives message and returns id for this message
// The group id generator is a function that returns string
const messageIdGenerator = (message: ChatMessage<MessageContentType>) => nanoid();
const groupIdGenerator = () => nanoid();

const akaneStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
const eliotStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
const emilyStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
const joeStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});

// Create serviceFactory
const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
    return new FediChatService(storage, updateState);
};

const akane = new User({
    id: akaneModel.name,
    presence: new Presence({status: UserStatus.Available, description: ""}),
    firstName: "",
    lastName: "",
    username: akaneModel.name,
    email: "",
    avatar: akaneModel.avatar,
    bio: ""
});

const emily = new User({
    id: emilyModel.name,
    presence: new Presence({status: UserStatus.Available, description: ""}),
    firstName: "",
    lastName: "",
    username: emilyModel.name,
    email: "",
    avatar: emilyModel.avatar,
    bio: ""
});

const eliot = new User({
    id: eliotModel.name,
    presence: new Presence({status: UserStatus.Available, description: ""}),
    firstName: "",
    lastName: "",
    username: eliotModel.name,
    email: "",
    avatar: eliotModel.avatar,
    bio: ""
});

const joe = new User({
    id: joeModel.name,
    presence: new Presence({status: UserStatus.Available, description: ""}),
    firstName: "",
    lastName: "",
    username: joeModel.name,
    email: "",
    avatar: joeModel.avatar,
    bio: ""
});

const chats = [
    {name: "Akane", storage: akaneStorage},
    {name: "Eliot", storage: eliotStorage},
    {name: "Emily", storage: emilyStorage},
    {name: "Joe", storage: joeStorage}
];

function Home() {

    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        //setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        //setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Qui puoi aggiungere la logica per verificare le credenziali
    // ad esempio, inviare una richiesta HTTP a un server
    // e controllare se le credenziali sono corrette
    if (true) {//username === 'utente' && password === 'password') {
        setLoggedIn(true);
    } else {
        alert('Credenziali errate. Riprova!');
    }
    };

    return (
        <div>
          {loggedIn ? (
            <div className="h-100 d-flex flex-column overflow-hidden">
            <Container fluid className="p-4 flex-grow-1 position-relative overflow-hidden">
                <Row className="pb-2 flex-nowrap max-height">
                    <Col>
                        <ChatProvider serviceFactory={serviceFactory} storage={akaneStorage} config={{
                            typingThrottleTime: 250,
                            typingDebounceTime: 900,
                            debounceTyping: true,
                            autoDraft: AutoDraft.Save | AutoDraft.Restore
                        }}>
                            <Chat user={akane}/>
                        </ChatProvider>
                    </Col>
                    <Col>
                        <ChatProvider serviceFactory={serviceFactory} storage={eliotStorage} config={{
                            typingThrottleTime: 250,
                            typingDebounceTime: 900,
                            debounceTyping: true,
                            autoDraft: AutoDraft.Save | AutoDraft.Restore
                        }}>
                            <Chat user={eliot}/>
                        </ChatProvider>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={"username"}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={"password"}
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      );
    

}
export default Home;
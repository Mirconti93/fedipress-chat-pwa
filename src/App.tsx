import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    BasicStorage,
    ChatMessage,
    ChatProvider,
    Conversation,
    ConversationId,
    ConversationRole,
    IStorage,
    MessageContent,
    MessageContentType,
    MessageDirection,
    MessageStatus,
    Participant,
    Presence,
    TextContent,
    TypingUsersList,
    UpdateState,
    User,
    UserStatus
} from "./use-cases";
import {FediChatService} from "./use-cases/services/FediChatService";
import {Chat} from "./components/Chat";
import {nanoid} from "nanoid";
import {Col, Container, Row} from "react-bootstrap";
import {akaneModel, eliotModel, emilyModel, joeModel, users} from "./data/data";
import {AutoDraft} from "./use-cases/enums/AutoDraft";
import {Footer} from "./components/Footer";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// sendMessage and addMessage methods can automagically generate id for messages and groups
// This allows you to omit doing this manually, but you need to provide a message generator
// The message id generator is a function that receives message and returns id for this message
// The group id generator is a function that returns string
const messageIdGenerator = (message: ChatMessage<MessageContentType>) => nanoid();
const groupIdGenerator = () => nanoid();

const userStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
const akaneStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
const eliotStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
const emilyStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
const joeStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});

// Create serviceFactory
const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
    return new FediChatService(storage, updateState);
};

const storage = new User({
    id: "Mirco",
    presence: new Presence({status: UserStatus.Available, description: ""}),
    firstName: "Mirco",
    lastName: "",
    username: "Mirco",
    email: "",
    avatar: eliotModel.avatar,
    bio: ""
});

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

function createConversation(id: ConversationId, name: string): Conversation {
    return new Conversation({
        id,
        participants: [
            new Participant({
                id: name,
                role: new ConversationRole([])
            })
        ],
        unreadCounter: 0,
        typingUsers: new TypingUsersList({items: []}),
        draft: ""
    });
}

function createExtendedConversation(id: ConversationId, name: string, description: string): Conversation {
    return new Conversation({
        id,
        participants: [
            new Participant({
                id: name,
                role: new ConversationRole([])
            })
        ],
        unreadCounter: 0,
        typingUsers: new TypingUsersList({items: []}),
        draft: "",
        description
    });
}

// Add users and conversations to the states
chats.forEach(c => {

    users.forEach(u => {
        if (u.name !== c.name) {
            c.storage.addUser(new User({
                id: u.name,
                presence: new Presence({status: UserStatus.Available, description: ""}),
                firstName: "",
                lastName: "",
                username: u.name,
                email: "",
                avatar: u.avatar,
                bio: ""
            }));

            const conversationId = nanoid();

            const myConversation = c.storage.getState().conversations.find(cv => typeof cv.participants.find(p => p.id === u.name) !== "undefined");
            if (!myConversation) {

                c.storage.addConversation(createConversation(conversationId, u.name));

                const chat = chats.find(chat => chat.name === u.name);

                if (chat) {

                    const hisConversation = chat.storage.getState().conversations.find(cv => typeof cv.participants.find(p => p.id === c.name) !== "undefined");
                    if (!hisConversation) {
                        chat.storage.addConversation(createConversation(conversationId, c.name));
                    }

                }

            }

        }
    });

});

async function loadConversations() {
    const response = await fetch('https://www.lightonmatter.it/wp-json/wp/v2/comments');
    if(!response.ok) {
        console.log("error in response:" + response.status)
        // oups! something went wrong
        return;
    }

    var comments: String[] =await response.json();

    const sortedItems = [...comments].sort((a, b) => {
        const obj1 = JSON.parse(JSON.stringify(a));
        const obj2 = JSON.parse(JSON.stringify(b));

        const date1 = new Date(obj1.date.toString());
        const date2 = new Date(obj2.date.toString());

        if (date1 < date2) {
            return -1
        } else if (date1 > date2) {
            return 1
        } else {
            return 0
        }
    });
    comments = sortedItems
    comments.forEach(c => {
        const obj = JSON.parse(JSON.stringify(c));
        console.log("conversation:" + JSON.stringify(c))
        userStorage.addConversation(createExtendedConversation(obj.post, obj.author_name, "Ciao"));
        userStorage.addUser(new User({
            id: obj.author_name,
            presence: new Presence({status: UserStatus.Available, description: ""}),
            firstName: obj.author_name,
            lastName: "",
            username: obj.author_name,
            email: obj.author_name + "@protonmail.com",
            avatar: akane.avatar,
            bio: "Hi"
        }))

        userStorage.addMessage(new ChatMessage({
            id: "", // Id will be generated by storage generator, so here you can pass an empty string
            content: obj.content.rendered as unknown as MessageContent<TextContent>,
            contentType: MessageContentType.TextHtml,
            senderId: obj.author_name,
            receiverId: obj.author_name,
            direction: MessageDirection.Outgoing,
            status: MessageStatus.Sent,
            createdTime: obj.date
        }), obj.post, true);

    });

    

}

loadConversations();

function App() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Qui puoi aggiungere la logica per verificare le credenziali
    // ad esempio, inviare una richiesta HTTP a un server
    // e controllare se le credenziali sono corrette
    if (username === 'Mirco') {//username === 'utente' && password === 'password') {
        setLoggedIn(true);
    } else {
        alert('Credenziali errate. Riprova!');
    }
    };        
    
    return (
        <div className="h-100">
          {loggedIn ? (
            <div className="h-100 d-flex flex-column overflow-hidden">
            <Container fluid className="p-4 flex-grow-1 position-relative overflow-hidden">
                <Row className="pb-2 flex-nowrap max-height">
                    <Col>
                        <ChatProvider serviceFactory={serviceFactory} storage={userStorage} config={{
                            typingThrottleTime: 250,
                            typingDebounceTime: 900,
                            debounceTyping: true,
                            autoDraft: AutoDraft.Save | AutoDraft.Restore}}>
                            <Chat user={storage}/>
                        </ChatProvider>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
          ) : (

        <div className='login-card container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div>
                        <div className='card-header'>
                        <h4>Login</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                            <div>
                                <label>Username:</label>
                                <input
                                type="text"
                                className='form-control'
                                value={username}
                                onChange={handleUsernameChange}
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                type="password"
                                className='form-control'
                                value={password}
                                onChange={handlePasswordChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary submit-button">Login</button>
                            </form>
                        
                        </div>
                    </div>
                </div>
            </div>
            </div>
          )}
        </div>
      );
    

}

export default App;

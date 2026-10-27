import { Col, Row } from "react-bootstrap";
import MessageConatiner from './MessageContainer';
import SendMessageForm from "./SendMessageForm";
const Chatroom=({messages,sendMessage})=><div>
    <Row className="px-5 py-5">
        <Col sm={10}>
            <h2>ChatRoom</h2>
        </Col>
    </Row>
    <Row className="px-5 py-5">
        <Col sm ={12}>
            <MessageConatiner messages={messages}/>
        </Col>
        <Col sm ={12}>
            <SendMessageForm sendMessage={sendMessage}/>
        </Col>
    </Row>
</div>

export default Chatroom;
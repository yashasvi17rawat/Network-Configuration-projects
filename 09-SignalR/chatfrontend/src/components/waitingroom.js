import { Button } from "react-bootstrap";
import { Container, Row, Col , Form} from 'react-bootstrap';
import { useState } from "react";
const WaitingRoom = ({joinChatRoom}) => {
    const[userame, setUserName] = useState();
    const[chatroom, SetChatRoom]= useState();

    return <Form onSubmit = {e =>{
        e.preventDefault();
        joinChatRoom(userame, chatroom);
    }}>
        <Row className="px-5 py-5">
            <Col sm={6}>

            <Form.Group>
                <Form.Control placeholder = 'Username' onChange ={e=>setUserName(e.target.value)}/>
                <br></br>
                <Form.Control placeholder = 'ChatRoom' onChange ={e=>SetChatRoom(e.target.value)}/>
            </Form.Group>
            </Col>
            <Col sm={12}>
                <hr/>
                <Button variant='success' type='submit'>Join</Button>
            </Col>
        </Row>
    </Form>

}

export default WaitingRoom;

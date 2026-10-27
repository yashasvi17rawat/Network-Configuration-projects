import logo from './logo.svg';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import Chatroom from './components/Chatroom';
function App() {

  const[ conn, setConnection]=useState();
  const[ messages, SetMessages]= useState([]);

  const joinChatRoom = async(username, chatroom)=>{
    try {
      //initiate a connection
      // const conn =new HubConnectionBuilder()
      //   .withUrl("http://localhost:5290/chat")
      //   .configureLogging(LogLevel.Information)
      //   .build();
      // //set up a handler
      // conn.on("RecieveMessage", (username,msg)=>{
      //   console.log("msg: ", msg); 
      // })
      // conn.on("RecieveSpecificMessage", (username,msg)=>{
      //   SetMessages(messages=>[...messages,{username,msg}]);
      //   console.log(messages);
      // })

      // await conn.start();

      // await conn.invoke("joinSpecificChatRoom", {username, chatroom});


      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5290/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("RecieveMessage", (user, msg) => {
        SetMessages(m => [...m, { user, msg }]);
      });

      conn.on("RecieveSpecificMessage", (user, msg) => {
        SetMessages(m => [...m, { user, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(conn);

    } catch (error) {
      console.log(error)
    }
  }
  const sendMessage = async(message)=>{
    try {
      await conn.invoke("SendMessage",message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className = 'font-weight-light'> Welcome to F1 chat app</h1>
            </Col>
          </Row>
           {!conn
           ?<WaitingRoom joinChatRoom={joinChatRoom}/>
           : <Chatroom messages={messages} sendMessage={sendMessage}></Chatroom>
           }
          
        </Container>
      </main>
    </div>
  );
}

export default App;

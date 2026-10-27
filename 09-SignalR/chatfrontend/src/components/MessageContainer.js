import { Table } from "react-bootstrap";

const MessageContainer = ({ messages }) => (
  <Table striped bordered>
    <tbody>
      {messages.map((m, index) => (
        <tr key={index}>
          <td>{m.msg} - {m.user}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default MessageContainer;
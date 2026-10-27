# F1 Chat App (SignalR Learning Project)

A small real-time chat app I built to learn **SignalR**.
Backend is **.NET**, frontend is **React**.

This is a learning project.

## What it does

1. You type a **username** and a **chat room name**, then press Join.
2. You land in that room.
3. You type a message and press Send.
4. Everyone in the same room sees it instantly, with no page refresh.
5. People in other rooms do not see it.

## What is SignalR (in simple words)

Normally a browser has to ask the server for new data again and again.
SignalR keeps **one connection open**, so the server can send data to the browser **the moment something happens**.

Two directions, two words:

| Direction | Browser side | Server side |
|-----------|--------------|-------------|
| Browser asks server to do something | `conn.invoke("MethodName", data)` | A method inside the Hub class |
| Server pushes something to browser | `conn.on("EventName", handler)` | `SendAsync("EventName", data)` |

The **name (string)** on both sides must match exactly. That is the only link between them.

## Tech used

- .NET (ASP.NET Core) with SignalR
- React with `@microsoft/signalr`
- React Bootstrap for the look

## Backend files (FormulaOne.chat)

| File | What it does |
|------|--------------|
| `Models/UserConnection.cs` | Holds two things: `Username` and `Chatroom` |
| `DataService/SharedDb.cs` | A shared notebook: connection ID -> (username, room). It is needed because the Hub object is created fresh for every call and forgets everything |
| `Hubs/ChatHub.cs` | The main file. Has the methods the browser can call |
| `Program.cs` | Turns on SignalR, allows the React app (CORS), registers `SharedDb` as one shared copy, and maps the hub to `/chat` |

### Methods in ChatHub

- `JoinSpecificChatRoom` : adds the user to a group (room), saves who they are in `SharedDb`, tells the room "X has joined".
- `SendMessage` : looks up who the caller is and which room they are in, then sends the message to everyone in that room.
- `JoinChat` : an early version that tells everyone someone joined. Not used by the React app.

### Events the server sends to the browser

- `RecieveMessage` : system messages like "X has joined".
- `RecieveSpecificMessage` : normal chat messages (username + text).

(The spelling "Recieve" is used on both sides, so it still works.)

## Frontend files (React)

| File | What it does |
|------|--------------|
| `App.js` | The brain. Creates the connection, registers the handlers, joins the room, keeps `conn` and `messages` in state, and switches between the join screen and the chat screen |
| `waitingroom.js` | The join form (username + room) |
| `Chatroom.js` | Layout of the chat screen |
| `MessageContainer.js` | Shows the list of messages |
| `SendMessageForm.js` | The input box and Send button |

## How one message travels

1. I press Send, so React calls `conn.invoke("SendMessage", text)`.
2. The server runs `SendMessage` in `ChatHub`.
3. The server finds my username and room in `SharedDb`.
4. The server calls `Clients.Group(room).SendAsync("RecieveSpecificMessage", username, text)`.
5. Every browser in that room runs its `conn.on("RecieveSpecificMessage", ...)` handler.
6. The handler adds the message to React state, and the screen updates.

## Things I learned

- Hub objects are short-lived, so shared data must live somewhere else (a singleton like `SharedDb`).
- Every browser tab gets its own unique connection ID, even for the same user.
- Groups are just names. A group exists as soon as someone is added to it.
- `invoke` waits for the server method to finish. The server replies with a "completion" message.
- Both browser and server send small ping messages (heartbeat) to know the other side is still alive. If nothing is heard for about 30 seconds, the connection is closed.
- CORS must allow the React origin (`http://localhost:3000`, with no trailing slash) and `AllowCredentials()`.
- In browser DevTools, Network tab, filter **WS**, then the **Messages** tab shows every SignalR message going up and down.

## How to run

Backend:

```bash
cd FormulaOne.chat
dotnet run
```

It should listen on `http://localhost:5290` (check the "Now listening on" line, and update the URL in `App.js` if your port is different).

Frontend (in the React folder):

```bash
npm install
npm start
```

Open `http://localhost:3000` in two tabs, join the same room with different usernames, and chat.

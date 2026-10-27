using Microsoft.AspNetCore.SignalR;
using FormulaOne.chat.Models;
using FormulaOne.chat.DataService;
namespace FormulaOne.chat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;
        public ChatHub(SharedDb sharedDb) => _shared = sharedDb;

        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("RecieveMessage", "admin", $"{conn.Username} has joined");

        }
        public async Task JoinSpecificChatRoom( UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
            _shared.connections[Context.ConnectionId]=conn;
            await Clients.Groups(conn.Chatroom).SendAsync("RecieveMessage","admin",$"{conn.Username} has joined {conn.Chatroom}");

        }

        public async Task SendMessage(String msg)
        {
            if(_shared.connections.TryGetValue(Context.ConnectionId,out UserConnection conn))
            {
                await Clients.Group(conn.Chatroom)
                    .SendAsync("RecieveSpecificMessage", conn.Username, msg);
            }
        }
    }
}
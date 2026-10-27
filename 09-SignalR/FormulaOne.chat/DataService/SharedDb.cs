using System.Collections.Concurrent;
using FormulaOne.chat.Models;
namespace FormulaOne.chat.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections=new ConcurrentDictionary<string, UserConnection>();
        public ConcurrentDictionary<string, UserConnection> connections => _connections;
    }
}

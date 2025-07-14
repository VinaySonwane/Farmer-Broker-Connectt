// src/components/chat/ChatBox.tsx
import { useEffect, useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import baseUrl from "@/config/baseURL";

interface ChatBoxProps {
  socket: any;
  userId: string;
  contact: any;
  onBack: () => void;
}

interface Message {
  sender: string;
  recipient: string;
  text: string;
  createdAt?: string;
}

export default function ChatBox({
  socket,
  userId,
  contact,
  onBack,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contact?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/messages`, {
          params: { user1: userId, user2: contact._id },
        });
        setMessages(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch messages: ", error);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [contact, userId]);

  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
      if (
        (message.sender === userId && message.recipient === contact?._id) ||
        (message.recipient === userId && message.sender === contact?._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, userId, contact]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: userId,
      recipient: contact._id,
      text: newMessage,
    };

    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!contact) {
    return (
      <div className="w-full md:w-2/3 flex items-center justify-center bg-green-50">
        <p className="text-gray-500">Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#F9FFF6] h-[calc(100vh-64px)] w-full md:w-2/3">
      {/* Header */}
      <div className="h-16 p-4 border-b bg-white shadow-sm flex items-center gap-4">
        {/* Back button on mobile only */}
        <button onClick={onBack} className="md:hidden text-green-700">
          <ArrowLeft size={24} />
        </button>
        <h3 className="font-semibold text-xl text-green-700 truncate">
          {contact.fullname}
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No messages yet. Start the conversation 👋
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-sm ${
                msg.sender === userId
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="h-20 p-4 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

// // src/components/chat/ChatBox.tsx
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import baseUrl from "@/config/baseURL";

// interface ChatBoxProps {
//   socket: any;
//   userId: string;
//   contact: any;
// }

// interface Message {
//   sender: string;
//   recipient: string;
//   text: string;
//   createdAt?: string;
// }

// export default function ChatBox({ socket, userId, contact }: ChatBoxProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!contact?._id) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${baseUrl}/api/messages`, {
//           params: { user1: userId, user2: contact._id },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch messages: ", error);
//         setMessages([]);
//       }
//     };

//     fetchMessages();
//   }, [contact, userId]);

//   useEffect(() => {
//     socket.on("receiveMessage", (message: Message) => {
//       if (
//         (message.sender === userId && message.recipient === contact?._id) ||
//         (message.recipient === userId && message.sender === contact?._id)
//       ) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [socket, userId, contact]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const message = {
//       sender: userId,
//       recipient: contact._id,
//       text: newMessage,
//     };

//     socket.emit("sendMessage", message);
//     setMessages((prev) => [...prev, message]);
//     setNewMessage("");
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!contact) {
//     return (
//       <div className="w-2/3 flex items-center justify-center bg-green-50">
//         <p className="text-gray-500">Select a contact to start chatting</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col bg-[#F9FFF6] h-[calc(100vh-64px)] w-full md:w-2/3">
//       {/* Header */}
//       <div className="h-16 p-4 border-b bg-white shadow-sm flex items-center">
//         <h3 className="font-semibold text-xl text-green-700 truncate">
//           {contact.fullname}
//         </h3>
//       </div>

//       {/* Scrollable Messages Area */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-400 mt-10">
//             No messages yet. Start the conversation 👋
//           </div>
//         ) : (
//           messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded-xl max-w-sm ${
//                 msg.sender === userId
//                   ? "bg-blue-500 text-white ml-auto"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="h-20 p-4 border-t bg-white flex items-center gap-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

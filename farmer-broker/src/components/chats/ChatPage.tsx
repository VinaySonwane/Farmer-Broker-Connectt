// src/components/chat/ChatPage.tsx
"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ContactList from "./ContactList";
import ChatBox from "./ChatBox";
import baseUrl from "@/config/baseURL";

const socket = io(`${baseUrl}`);

export default function ChatPage() {
  const { id: userId, role } = useSelector((state: RootState) => state.user);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial run
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }
  }, [userId]);

  return (
    <div className="flex h-full bg-green-50 border">
      {/* Contact list (visible on desktop OR mobile if no contact selected) */}
      {(!isMobile || !selectedContact) && (
        <ContactList
          socket={socket}
          userId={userId}
          role={role}
          onSelectContact={setSelectedContact}
        />
      )}

      {/* ChatBox (visible on desktop OR mobile if contact selected) */}
      {(!isMobile || selectedContact) && (
        <ChatBox
          socket={socket}
          userId={userId}
          contact={selectedContact}
          onBack={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import ContactList from "./ContactList";
// import ChatBox from "./ChatBox";
// import baseUrl from "@/config/baseURL";

// //const socket = io("http://localhost:8000"); // ✅ Socket correctly initialized
// const socket = io(`${baseUrl}`);

// export default function ChatPage() {
//   const { id: userId, role } = useSelector((state: RootState) => state.user); // ✅ User info from Redux
//   const [selectedContact, setSelectedContact] = useState<any>(null);

//   useEffect(() => {
//     if (userId) {
//       socket.emit("join", userId); // ✅ Optional room join for more advanced logic
//     }
//   }, [userId]);

//   return (
//     <div className="flex h-screen bg-green-50 border">
//       <ContactList
//         socket={socket}
//         userId={userId}
//         role={role}
//         onSelectContact={setSelectedContact}
//       />
//       <ChatBox socket={socket} userId={userId} contact={selectedContact} />
//     </div>
//   );
// }

// src/components/chat/ContactList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/config/baseURL";

interface ContactListProps {
  userId: string;
  role: string;
  socket: any;
  onSelectContact: (contact: any) => void;
}

export default function ContactList({
  userId,
  role,
  onSelectContact,
}: ContactListProps) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const endpoint = role === "farmer" ? "brokers" : "farmers";
      const res = await axios.get(`${baseUrl}/api/users/${endpoint}`);
      setContacts(res.data);
    };
    fetchContacts();
  }, [role]);

  const filteredContacts = contacts.filter((contact) =>
    contact.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/3 border-r p-4 bg-green-50 overflow-y-auto">
      <h2 className="text-lg font-bold text-green-800 mb-4">Chats</h2>

      <input
        type="text"
        placeholder="Search name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {filteredContacts.length === 0 ? (
        <p className="text-gray-500">No contacts found</p>
      ) : (
        filteredContacts.map((contact) => (
          <div
            key={contact._id}
            className="p-3 mb-2 rounded cursor-pointer hover:bg-green-100 transition"
            onClick={() => onSelectContact(contact)}
          >
            <p className="font-semibold text-green-900">{contact.fullname}</p>
            <p className="text-sm text-gray-500">
              {contact.phone || contact.email}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

// // src/components/chat/ContactList.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface ContactListProps {
//   userId: string;
//   role: string;
//   socket: any;
//   onSelectContact: (contact: any) => void;
// }

// export default function ContactList({
//   userId,
//   role,
//   onSelectContact,
// }: ContactListProps) {
//   const [contacts, setContacts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       const endpoint = role === "farmer" ? "brokers" : "farmers";
//       const res = await axios.get(
//         `http://localhost:8000/api/users/${endpoint}`
//       );
//       setContacts(res.data);
//     };
//     fetchContacts();
//   }, [role]);

//   return (
//     <div className="w-1/3 border-r p-4 overflow-y-auto">
//       <h2 className="text-lg font-bold mb-4 text-black">Chats</h2>
//       {contacts.map((contact) => (
//         <div
//           key={contact._id}
//           className="p-2 border-b hover:bg-gray-100 cursor-pointer"
//           onClick={() => onSelectContact(contact)}
//         >
//           <p className="font-light md:font-bold text-black">
//             {contact.fullname}
//           </p>
//           <p className="text-sm text-gray-500">
//             {contact.phone || contact.email}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

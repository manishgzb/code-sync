# 🚀 Code-Sync — A Collaborative Code Editor  

**Code-Sync** is a real-time, conflict-free collaborative code editor that lets multiple developers code together seamlessly.

---

## 🌟 Features  

### ⚡ Real-Time Collaboration  
- Live, **conflict-free editing** powered by sockets and Yjs(CRDT).  
- All participants see changes instantly across connected clients.  

### 💡 Rich Code Editor  
- **Syntax highlighting** for multiple programming languages.  
- **Autocomplete** and **intelligent indentation**.  
- Code formatting and line numbers for clean readability.  

### 🌐 Multi-Language Support  
- Supports a wide range of languages (JS, Python, C++, Java, HTML/CSS, etc.).  
- Easy switching between languages in the editor.  

### 🏠 Multi-Room System  
- Create or join **multiple rooms** for collaborative sessions.  
- Each room has its own real-time editing space.  

### 👥 User Presence & Cursor Sharing  
- See collaborators' **cursors and selections** in real time.  
- Each participant is represented by a unique color.  

### 📂 File Management (CRUD)  
- Create, rename, delete, and open files within the workspace.  
- Changes instantly reflect for all connected users in the same room.  

---<img width="1920" height="1008" alt="Screenshot 2025-11-03 140937" src="https://github.com/user-attachments/assets/99ea93d8-323e-4ebe-8f68-25c4ced8dcf8" />

<img width="1920" height="1008" alt="Screenshot 2025-11-03 141026" src="https://github.com/user-attachments/assets/0cbd667a-795c-4b29-975a-a1c6c5796ce8" />

<img width="1920" height="1080" alt="Screenshot 2025-11-03 141037" src="https://github.com/user-attachments/assets/e6a18fbc-131c-451d-9865-f784e7f37685" />
<img width="1920" height="1008" alt="Screenshot 2025-11-03 141116" src="https://github.com/user-attachments/assets/f59963d5-3344-4c15-98f6-7128035573e0" />
<img width="1920" height="1008" alt="Screenshot 2025-11-03 142949" src="https://github.com/user-attachments/assets/606be98d-3c09-47db-ae5b-96fb06137a87" />

![WhatsApp Image 2025-11-03 at 14 34 30_aebc79bb](https://github.com/user-attachments/assets/bff1c387-a379-4ca3-bf35-f4e768369227)

## 🛠️ Tech Stack  

| Category | Technologies |
|-----------|---------------|
| Frontend | React.js, CodeMirror, Socket.IO Client |
| Backend | Node.js, Express.js, Socket.IO |
| Database | MongoDB |
| Hosting | Vercel (frontend) / Render (backend) |
| Others | Yjs(CRDT) ,WebSockets, REST APIs |

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/manishgzb/code-sync.git
cd code-sync
```

### 2️⃣ Install Dependencies
```bash
cd client
npm install
cd ../server
npm install
```

### 3️⃣ Setup Environment Variables
#### Client
Create .env file inside client directory and add:
```
VITE_API_URL = "http://localhost:3000"
VITE_SOCKET_URL = "http://localhost:3000"
```

#### Server
Create .env file inside server directory and add:
```bash
DB_URL = "<your-mogodb-uri>"
PORT = 3000
JWT_SECRET_KEY = "a cat"
CLIENT_URL = "http://localhost:5173"
```

### 4️⃣Run the Application
#### Run the backend
```bash
cd server
node server.js
```

#### Run the frontend
```bash
cd client
npm run dev
```
Then open:
👉 http://localhost:5173 — Frontend
👉 http://localhost:3000 — Backend







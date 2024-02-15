import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './component/NavBar';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext'; // Correct import

function App() {
  const  user  = useContext(AuthContext);

  if (user === undefined) {
    console.log(user)
    // Render loading state or placeholder until user context is initialized
    return <div>Loading...</div>;
  }

  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <div> 
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </div>
    </ChatContextProvider>
  );
}


export default App;

import React from 'react';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';
import useWebSocket from './hooks/useWebSocket';
import './App.css';

const App = () => {
  const { sendMessage, ws } = useWebSocket('ws://localhost:8080');

  return (
    <div className="app">
      <h1>Messenger App</h1>
      <MessageList ws={ws} />
      <AddMessage sendMessage={sendMessage} />
    </div>
  );
};

export default App;

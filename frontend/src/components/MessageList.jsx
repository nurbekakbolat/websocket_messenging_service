import React, { useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import './MessageList.css';

const MessageList = ({ ws }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('http://localhost:8080/messages');

        const data = await res.json();
  
        queryClient.setQueryData(['messages'], data);
      } catch (err) {
        console.error(err);
      }
    };

    getMessages();
  }, []);

  const { data } = useQuery({
    queryKey: ['messages'],
    queryFn: () => queryClient.getQueryData(['messages']) || { messages: [], serverResponses: [] },
    initialData: { messages: [], serverResponses: [] }
  });

  // Merge messages and server responses and sort by time
  const combinedData = [...data.messages, ...data.serverResponses.map((response) => {
    return {...response, server: true}
  })].sort((a, b) => new Date(a.time) - new Date(b.time));

  const clearMessages = async () => {
    try {
      await fetch('http://localhost:8080/messages', {
        method: 'DELETE'
      });
  
      queryClient.setQueryData(['messages'], { messages: [], serverResponses: [] });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="header">
      <button onClick={clearMessages}>Reset</button>
      </div>
      <div className="msg-list-container">
        <ul>
          {combinedData.map((item, index) => (
            <li key={index} className={!item.server ? 'user-message' : 'server-response'}>
              <span>{item.message || item.serverResponse} </span>
              <span className="timestamp">{new Date(item.time).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageList;

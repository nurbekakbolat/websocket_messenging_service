import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

let ws;

const MAX_MESSAGES = 9;

const useWebSocketSingleton = (url) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!ws) {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        // console.log('Received WebSocket message:', payload);

        queryClient.setQueryData(['messages'], (oldData) => {
          if (!oldData) {
            oldData = { messages: [], serverResponses: [] };
          }

          const newMessages = payload.messages ? payload.messages : [...oldData.messages, payload.messageAdded];
          const newServerResponses = payload.serverResponses ? payload.serverResponses : [...oldData.serverResponses, payload.serverResponse];

          if (newMessages.length > MAX_MESSAGES) {
            newMessages.shift();
          }

          if (newServerResponses.length > MAX_MESSAGES) {
            newServerResponses.shift();
          }
          
          return {
            messages: newMessages,
            serverResponses: newServerResponses,
          };
        });
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }

    return () => {
      ws.close();
      ws = null;
    };
  }, [url, queryClient]);

  const sendMessage = async (message) => {
    try {
      const messageData = queryClient.getQueryData(['messages']) || { messages: [], serverResponses: [] };

      const response = await fetch('http://localhost:8080/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, total: messageData.messages.length }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Message sent:', data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return { sendMessage, ws };
};

export default useWebSocketSingleton;

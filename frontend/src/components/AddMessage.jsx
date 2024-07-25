import React, { useState } from 'react';

const AddMessage = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (value.length > 50) {
      return;
    }

    setMessage(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-msg-wrapper">
        <input
          className="msg-input"
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Enter your message"
        />
        <button type="submit">Add Message</button>
      </div>
    </form>
  );
};

export default AddMessage;

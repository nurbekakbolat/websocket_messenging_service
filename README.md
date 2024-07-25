# WebSocket Messaging Service

### Backend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/nurbekakbolat/websocket_messenging_service.git

    cd websocket_messenging_service/backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the server**:
    ```sh
    npm start
    ```
   The backend server will start on `http://localhost:8080`.

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```sh
    cd ../frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the frontend application**:
    ```sh
    npm run dev
    ```
   The frontend application will start on `http://localhost:5173`.

## API Endpoints

### POST /messages

- **Description**: Create a new message.
- **Request Body**: 
    ```json
    {
      "message": "Your message here",
      "total": 5  // Total number of messages currently in the frontend
    }
    ```
- **Response**:
    ```json
    {
      "message": "Your message here",
      "time": "2023-07-21T15:21:00.000Z"
    }
    ```

### GET /messages

- **Description**: Retrieve all messages and server responses.
- **Response**:
    ```json
    {
      "messages": [
        {
          "message": "First message",
          "time": "2023-07-21T15:21:00.000Z"
        },
        ...
      ],
      "serverResponses": [
        {
          "message": "Server response",
          "time": "2023-07-21T15:21:00.000Z"
        },
        ...
      ]
    }
    ```

## WebSocket

- **Connection**: `ws://localhost:8080`
- **Messages**: Real-time updates about added or removed messages.

# API Contract: Chatbot Integration

## POST /api/chat

### Description
Endpoint for sending user messages to the chatbot backend and receiving responses.

### Request
**Content-Type**: `application/json`

**Body**:
```json
{
  "message": "string (required)"
}
```

**Body Parameters**:
- `message`: The user's message to send to the chatbot (required, string, max 2000 characters)

### Response
**Success Response**:
- **Status**: `200 OK`
- **Content-Type**: `application/json`

```json
{
  "response": "string",
  "status": "success"
}
```

**Error Response**:
- **Status**: `400 Bad Request` or `500 Internal Server Error`
- **Content-Type**: `application/json`

```json
{
  "response": "string",
  "status": "error",
  "error": "string"
}
```

### Response Parameters:
- `response`: The chatbot's response to the user's message
- `status`: Indicates if the request was successful ("success") or failed ("error")
- `error`: Detailed error message when status is "error" (optional)

### Example Request:
```json
{
  "message": "Hello, how can I use this documentation?"
}
```

### Example Response:
```json
{
  "response": "Hello! This documentation covers how to use our platform. You can search for specific topics using the search bar.",
  "status": "success"
}
```

## Client Integration Requirements

### Frontend Implementation
The frontend chatbot component must:
1. Send messages to the `/api/chat` endpoint using POST method
2. Include the message content in the request body as JSON
3. Handle both success and error responses appropriately
4. Display error messages to the user when status is "error"
5. Include appropriate error handling and timeout mechanisms
# Data Model: Docusaurus Chatbot UI Integration

## Entities

### ChatMessage
Represents a single message in the conversation.

**Fields**:
- `id`: string - Unique identifier for the message
- `content`: string - The text content of the message
- `sender`: 'user' | 'bot' - Indicates who sent the message
- `timestamp`: Date - When the message was sent/received
- `status`: 'sent' | 'sending' | 'error' - Current status of the message

**Validation**:
- `content` must not be empty or exceed 2000 characters
- `sender` must be either 'user' or 'bot'
- `timestamp` must be a valid date

### ChatHistory
Collection of ChatMessage objects stored in browser LocalStorage.

**Fields**:
- `sessionId`: string - Unique identifier for the chat session
- `messages`: ChatMessage[] - Array of messages in the conversation
- `createdAt`: Date - When the chat history was created
- `updatedAt`: Date - When the chat history was last modified

**Validation**:
- `sessionId` must be unique per user session
- `messages` array must not exceed 100 messages (to prevent storage issues)
- `createdAt` and `updatedAt` must be valid dates

### ChatAPIResponse
Data structure for responses from the backend API.

**Fields**:
- `response`: string - The bot's response text
- `status`: 'success' | 'error' - Status of the API call
- `error?`: string - Error message if status is 'error' (optional field)

**Validation**:
- `response` must be provided when status is 'success'
- `error` must be provided when status is 'error'
- `status` must be either 'success' or 'error'

### ChatState
Current state of the chat interface.

**Fields**:
- `isOpen`: boolean - Whether the chat panel is open
- `isLoading`: boolean - Whether the system is waiting for a response
- `messages`: ChatMessage[] - Current messages displayed in the chat
- `inputValue`: string - Current value in the input field
- `error`: string | null - Any current error message

**Validation**:
- `isOpen` must be a boolean
- `isLoading` must be a boolean
- `messages` must be an array of ChatMessage objects
- `inputValue` must not exceed 2000 characters

## Relationships

- ChatHistory contains multiple ChatMessage objects
- ChatState references the current ChatHistory
- ChatAPIResponse is returned from API calls that create new ChatMessage objects

## State Transitions

### Chat Panel State
- `closed` → `open` (when chat icon is clicked)
- `open` → `closed` (when close button is clicked)

### Message State
- `created` → `sending` (when user sends message)
- `sending` → `sent` (when API returns success)
- `sending` → `error` (when API returns error)

### Loading State
- `idle` → `loading` (when waiting for API response)
- `loading` → `idle` (when response is received or error occurs)
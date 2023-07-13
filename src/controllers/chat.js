function sendMessage() {
  var input = document.getElementById("inputQuestion");
  var question = input.value;

  // Create a new chat message element
  var chatMessage = document.createElement("div");
  chatMessage.className = "chat-message user-message";
  chatMessage.textContent = question;

  // Append the message to the chat area
  var chatArea = document.getElementById("chatArea");
  chatArea.appendChild(chatMessage);

  // Clear the input field
  input.value = "";

  // Call the function to process the user question
  processUserQuestion(question);
}

function processUserQuestion(question) {
  // Send the question to the backend or chatbot API
  // Receive the response from the backend or chatbot API

  var response = "Exemplo de resposta do assistente";

  // Create a new chat message element for the response
  var chatMessage = document.createElement("div");
  chatMessage.className = "chat-message assistant-message";
  chatMessage.textContent = response;

  // Append the message to the chat area
  var chatArea = document.getElementById("chatArea");
  chatArea.appendChild(chatMessage);

  // Scroll to the bottom of the chat area
  chatArea.scrollTop = chatArea.scrollHeight;
}

function checkInput() {
  var inputElement = document.getElementById('inputQuestion');
  var sendButton = document.getElementById('sendButton');

  if (inputElement.value.trim() !== '') {
      sendButton.disabled = false;
  } else {
      sendButton.disabled = true;
  }
}

function handleKeyDown(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage();
  }
}
const apiUrl = window.location.href.includes("localhost") ? "http://localhost:3000" : "https://genie-fhxk.onrender.com";

function addCopyButton(messageElement, isAssistantMessage = false) {
  const copyButton = document.createElement("button");
  copyButton.className = "copy-button";
  copyButton.innerHTML = '<i class="fas fa-copy"></i>';
  messageElement.appendChild(copyButton);

  copyButton.addEventListener("click", () => {
    const textToCopy = messageElement.textContent;
    copyToClipboard(textToCopy);
  });
}

function copyToClipboard(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

function createElementWithClass(className) {
  const element = document.createElement("div");
  element.className = className;
  return element;
}

function appendMessageToChatArea(className, text, isUserMessage = false) {
  const chatArea = document.getElementById("chatArea");
  const chatMessage = createElementWithClass(`chat-message ${className}`);

  if (isUserMessage) {
    const messageContent = document.createElement("div");
    messageContent.textContent = text;
    messageContent.className = "message-content";
    chatMessage.appendChild(messageContent);
    chatArea.appendChild(chatMessage);
    addCopyButton(chatMessage);
  } else {
    chatMessage.textContent = text;
    chatArea.appendChild(chatMessage);
  }

  chatArea.scrollTop = chatArea.scrollHeight;
}

async function processUserQuestion(question, type) {
  try {
    appendMessageToChatArea("user-message", question, true);

    const url = `${apiUrl}/api/chat/${type}`;
    const body = {
      question: question,
    };

    appendMessageToChatArea("assistant-message loading");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    const answerMessage = createElementWithClass("chat-message assistant-message");
    if (type === "image") {
      const msg = createElementWithClass("assistant-message");
      msg.textContent = "Claro, aqui está!";
      const img = document.createElement("img");
      img.src = data.answer;
      answerMessage.appendChild(msg);
      answerMessage.appendChild(img);
    } else {
      answerMessage.textContent = data.answer;
    }

    const chatArea = document.getElementById("chatArea");
    const loadingMessage = chatArea.lastChild;
    chatArea.replaceChild(answerMessage, loadingMessage);
    chatArea.scrollTop = chatArea.scrollHeight;

    addCopyButton(answerMessage, "assistant-message");
  } catch (error) {
    console.error(error);
  }
}


function sendMessage(type) {
  const input = document.getElementById("inputQuestion");
  const question = input.value.trim();
  if (question) {
    input.value = "";
    checkInput();
    processUserQuestion(question, type);
  }
}

function checkInput() {
  const inputElement = document.getElementById("inputQuestion");
  const sendButton = document.getElementById("sendButton");
  const imageButton = document.getElementById("imageButton");
  sendButton.disabled = imageButton.disabled = inputElement.value.trim() === "";
}

function handleKeyDown(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage("text");
  }
}

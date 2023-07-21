const apiUrl = window.location.href.includes("localhost") ? "http://localhost:3000" : "https://genie-fhxk.onrender.com"

function sendMessage(type) {
  var input = document.getElementById("inputQuestion");
  var question = input.value;

  var chatMessage = document.createElement("div");
  chatMessage.className = "chat-message user-message";
  chatMessage.textContent = question;

  var chatArea = document.getElementById("chatArea");
  chatArea.appendChild(chatMessage);

  input.value = "";
  checkInput()

  processUserQuestion(question, type);
}

function processUserQuestion(question, type) {
  console.log("🚀 ~ file: chat.js:23 ~ processUserQuestion ~ apiUrl:", apiUrl)
  const url = `${apiUrl}/api/chat/${type}`;
  const body = {
    question: question
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      var chatMessage = document.createElement("div");
      chatMessage.className = "chat-message assistant-message";

      if(type === "image"){
        //------------- Gerar Link -----------------
        // const link = document.createElement('a');
        // link.href = data.answer;
        // link.textContent = "Visualizar imagem";
        // link.target = "_blank";

        // chatMessage.appendChild(link);
        //------------------------------------------

        const msg = document.createElement('div');
        msg.textContent = 'Claro, aqui está!';
        chatMessage.appendChild(msg)

        const img = document.createElement('img');
        img.src = data.answer;
        chatMessage.appendChild(img);
      }
      else
        chatMessage.textContent = data.answer;

      var chatArea = document.getElementById("chatArea");
      chatArea.appendChild(chatMessage);

      chatArea.scrollTop = chatArea.scrollHeight;
    })
    .catch(error => {
      console.log(error)
    });
}

function checkInput() {
  var inputElement = document.getElementById('inputQuestion');
  var sendButton = document.getElementById('sendButton');
  var imageButton = document.getElementById('imageButton');

  if (inputElement.value.trim() !== '') {
      sendButton.disabled = false;
      imageButton.disabled = false;
  } else {
      sendButton.disabled = true;
      imageButton.disabled = true;
  }
}

function handleKeyDown(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage("text");
  }
}
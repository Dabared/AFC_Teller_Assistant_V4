const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const apiKey = "AIzaSyCx2m-cadXp3InsWvZUThY925eU0JT548Q";

function getTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

function appendMessage(text, className) {
  const message = document.createElement('div');
  message.className = `message ${className}`;
  message.setAttribute('data-time', getTime());
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  userInput.value = '';

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text }] }]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    appendMessage(reply, 'bot');
  } catch (error) {
    appendMessage("Error: " + error.message, 'bot');
  }
}

function handleKey(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

'use strict';
var button = document.querySelector('.message-form__button');
var chat = document.querySelector('.chat');

function sendMessage(recipient) {
  var text = document.querySelector('.message-form__text').value;
  if (!(/^\s+$/.test(text)) && text !== '') {
    text = String(text);
    var chatMessage = document.createElement('div');
    if (recipient) {
      chatMessage.classList.add('chat-message', 'chat-message_recipient');
    } else {
      chatMessage.classList.add('chat-message');
    }
    var chatMessages = document.querySelector('.chat-messages');
    var chatMessageText = document.createElement('div');
    chatMessageText.classList.add('chat-message__text');
    var chatMessageAvatar = document.createElement('div');
    chatMessageAvatar.classList.add('chat-message__avatar');
    chatMessageText.innerText = text;
    chatMessages.appendChild(chatMessage);
    chatMessage.appendChild(chatMessageText);
    chatMessage.appendChild(chatMessageAvatar);
    chat.scrollTop = chat.scrollHeight;
  }
  document.querySelector('.message-form__text').value = '';
}
window.onsubmit = function() {
  return false;
};
button.onclick = function() {
  sendMessage(false);
};
var button = document.querySelector('.message-form__button');

function sendMessage(adressee) {
  var text = document.querySelector('.message-form__text').value;
  if (!(/^\s+$/.test(text)) && text !== '') {
    var chatMessage = document.createElement('div');
    if (adressee) {
      chatMessage.classList.add('chat-message', 'chat-message_addressee');
    } else {
      chatMessage.classList.add('chat-message');
    }
    var chatMessages = document.querySelector('.chat-messages');
    var chatMessageText = document.createElement('div');
    chatMessageText.classList.add('chat-message__text');
    var chatMessageAvatar = document.createElement('div');
    chatMessageAvatar.classList.add('chat-message__avatar');
    chatMessageText.innerHTML = text;
    chatMessages.appendChild(chatMessage);
    chatMessage.appendChild(chatMessageText);
    chatMessage.appendChild(chatMessageAvatar);
  }
}
window.onsubmit = function() {
  return false;
};
button.onclick = function() {
  sendMessage(false);
};
(function messageCreator() {
  var button = document.querySelector('.input-box__button');
  var comment = document.querySelector('.input-box__text');
  var switchButton = document.querySelector('.input-box__button_switch');
  var isUser = false;


  switchButton.onclick = function userSwitch() {
    if (!isUser) {
      isUser = true;
    } else { isUser = false; }
  };

  function commentBot() {
    if (comment.value != '' && !(/^\s+$/.test(comment.value))) {
      var newComment = document.createElement('div');
      newComment.className = 'message-container message-container_interlocutor';
      var interlocutorName = document.createElement('span');
      interlocutorName.className = 'user-name user-name_interlocutor';
      var interlocutorComment = document.createElement('p');
      interlocutorComment.className = 'user-message';
      interlocutorName.innerHTML = 'Interlocutor';
      interlocutorComment.innerHTML = comment.value;
      document.querySelector('.message-box').appendChild(newComment);
      newComment.appendChild(interlocutorName);
      newComment.appendChild(interlocutorComment);
      comment.value = '';
    }
  }


  button.addEventListener('click', function userCommentAppend() {
    if (comment.value != '' && !(/^\s+$/.test(comment.value)) && !isUser) {
      var newComment = document.createElement('div');
      newComment.className = 'message-container message-container_user';
      var userComment = document.createElement('p');
      userComment.className = 'user-message';
      var userName = document.createElement('span');
      userName.className = 'user-name user-name_user';
      userName.innerHTML = 'You';
      userComment.innerHTML = comment.value;
      document.querySelector('.message-box').appendChild(newComment);
      newComment.appendChild(userName);
      newComment.appendChild(userComment);
      comment.value = '';
    }
    if (comment.value != '' && isUser === true) {
      commentBot();
    }
  });
})();
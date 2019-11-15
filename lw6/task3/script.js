'use strict';
var button = document.querySelector('.form-submit');
window.onsubmit = function() {
  return false;
};
(function validate() {
  var formItemText = document.querySelectorAll('.form-item__text'),
    formItemError = document.querySelectorAll('.form-item__error');

  function validateName() {
    if (/[А-Яа-я]+\s[А-Яа-я]+\s[А-Яа-я]+$/.test(formItemText[0].value)) {
      formItemError[0].classList.remove('form-item__error_visible');
    } else {
      formItemError[0].classList.add('form-item__error_visible');
    }
  }

  function validateEmail() {
    if (/\w+@\w+\.[A-Za-z]*[A-Za-z]\b/.test(formItemText[1].value)) {

      formItemError[1].classList.remove('form-item__error_visible');
    } else {
      formItemError[1].classList.add('form-item__error_visible');
    }
  }

  function validatePassword() {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/.test(formItemText[2].value)) {

      formItemError[2].classList.remove('form-item__error_visible');
    } else {
      formItemError[2].classList.add('form-item__error_visible');
    }
  }
  formItemText[0].addEventListener('blur', validateName);
  formItemText[1].addEventListener('blur', validateEmail);
  formItemText[2].addEventListener('blur', validatePassword);
  button.onclick = function() {
    validateName();
    validateEmail();
    validatePassword();
  };
})();
'use strict';
var button = document.querySelector('.form_submit');
window.onsubmit = function() {
  return false;
};
(function validate() {
  var formItemInput = document.querySelectorAll('.form-item__input'),
    formItemError = document.querySelectorAll('.form-item__error');

  function validateName() {
    if (/[А-Яа-я]+\s[А-Яа-я]+\s[А-Яа-я]+$/.test(formItemInput[0].value)) {
      formItemError[0].classList.remove('form-item__error_visible');
    } else {
      formItemError[0].classList.add('form-item__error_visible');
    }
  }

  function validateEmail() {
    if (/\w+@\w+\.[A-Za-z]*[A-Za-z]\b/.test(formItemInput[1].value)) {

      formItemError[1].classList.remove('form-item__error_visible');
    } else {
      formItemError[1].classList.add('form-item__error_visible');
    }
  }

  function validatePassword() {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/.test(formItemInput[2].value)) {

      formItemError[2].classList.remove('form-item__error_visible');
    } else {
      formItemError[2].classList.add('form-item__error_visible');
    }
  }
  formItemInput[0].addEventListener('blur', validateName);
  formItemInput[1].addEventListener('blur', validateEmail);
  formItemInput[2].addEventListener('blur', validatePassword);
  button.onclick = function() {
    validateName();
    validateEmail();
    validatePassword();
  };
})();
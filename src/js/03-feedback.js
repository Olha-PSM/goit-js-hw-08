import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('.feedback-form input');
const messageEl = document.querySelector('.feedback-form textarea');

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

savedLocalStorageValue();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function savedLocalStorageValue() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    emailEl.value = savedMessage.email || '';
    messageEl.value = savedMessage.message || '';
  }
}

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const inputMail = document.querySelector('.feedback-form input');
const inputMessage = document.querySelector('.feedback-form textarea');
let formData = {};
populateFormData();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onSetForm, 500));

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onSetForm(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (formData.email) {
      inputMail.value = formData.email;
    }
    if (formData.message) {
      inputMessage.value = formData.message;
    }
  }
}

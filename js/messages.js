import { isEscapeKey } from './utils.js';
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
let newSuccessMessage = '';
let newFailMessage = '';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
  }
  if (newFailMessage) {
    hideFailMessage();
    return;
  }
  hideSuccessMessage();
};

const onDocumentClick = (evt) => {
  if (evt.target === document.querySelector('.error__inner') || evt.target === document.querySelector('.success__inner')) {
    return;
  }
  if (newFailMessage) {
    hideFailMessage();
    return;
  }
  hideSuccessMessage();
};


function hideSuccessMessage () {
  newSuccessMessage.remove();
  newSuccessMessage = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

function hideFailMessage () {
  newFailMessage.remove();
  newFailMessage = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}


const onSuccessButtonClick = () => hideSuccessMessage();
const onFailButtonClick = () => hideFailMessage();


const showSuccessMessage = () => {
  newSuccessMessage = successMessageTemplate.cloneNode(true);
  const successButton = newSuccessMessage.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.body.append(newSuccessMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showFailMessage = () => {
  newFailMessage = errorMessageTemplate.cloneNode(true);
  const failButton = newFailMessage.querySelector('.error__button');
  failButton.addEventListener('click', onFailButtonClick);
  document.body.append(newFailMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export{ showFailMessage, showSuccessMessage };

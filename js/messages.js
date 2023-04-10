import { isEscapeKey, showAlert } from './utils.js';
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
let newSuccessMessage = '';
let newFailMessage = '';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (newFailMessage) {
      hideFailMessage();
    }
    hideSuccessMessage();
  }
};


const onDocumentClick = (evt) => {
  const errorBlock = document.querySelector('.error__inner');
  const successBlock = document.querySelector('.success__inner');
  const errorBlockTitle = errorBlock.querySelector('.error__title');
  const successBlockTitle = successBlock.querySelector('.success__title');
  if (evt.target === errorBlock & evt.target === errorBlockTitle ||
  evt.target === successBlock & evt.target === successBlockTitle) {
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

const onUploadFail = () => {
  showAlert('Ошибка загрузки данных');
};


export{ showFailMessage, showSuccessMessage, onUploadFail };

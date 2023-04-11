import { isEscapeKey, showAlert } from './utils.js';
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageBlock = successMessageTemplate.cloneNode(true);
const successButton = successMessageBlock.querySelector('.success__button');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageBlock = errorMessageTemplate.cloneNode(true);
const failButton = errorMessageBlock.querySelector('.error__button');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorMessageBlock) {
      hideFailMessage();
    }
    hideSuccessMessage();
  }
};

const onDocumentClick = (evt) => {
  const { close, modal } = evt.target.dataset;
  if (close || modal) {
    if (errorMessageBlock) {
      hideFailMessage();
    }
    hideSuccessMessage();
  }
};


function hideSuccessMessage () {
  successMessageBlock.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

function hideFailMessage () {
  errorMessageBlock.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const onSuccessButtonClick = () => hideSuccessMessage();
const onFailButtonClick = () => hideFailMessage();


const showSuccessMessage = () => {
  successButton.addEventListener('click', onSuccessButtonClick);
  document.body.append(successMessageBlock);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showFailMessage = () => {
  failButton.addEventListener('click', onFailButtonClick);
  document.body.append(errorMessageBlock);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const onUploadFail = () => {
  showAlert('Ошибка загрузки данных');
};


export { showFailMessage, showSuccessMessage, onUploadFail };

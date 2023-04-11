import { isEscapeKey, showAlert } from './utils.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageBlock = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageBlock = errorMessageTemplate.cloneNode(true);

let currentMessageBlock = null;

const showMessageBlock = () => {
  document.body.append(currentMessageBlock);
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideMessageBlock = () => {
  currentMessageBlock.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onModalClick = (evt) => {
  if (typeof evt.target.dataset.close !== 'undefined') {
    hideMessageBlock();
  }
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessageBlock();
  }
}

const showSuccessMessage = () => {
  currentMessageBlock = successMessageBlock;
  showMessageBlock();
};

const showFailMessage = () => {
  currentMessageBlock = errorMessageBlock;
  showMessageBlock();
};

successMessageBlock.addEventListener('click', onModalClick);
errorMessageBlock.addEventListener('click', onModalClick);

const onUploadFail = () => {
  showAlert('Ошибка загрузки данных');
};

export { showFailMessage, showSuccessMessage, onUploadFail };

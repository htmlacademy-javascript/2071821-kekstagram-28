import { isEscapeKey } from './utils.js';
import { initScale, scaleReset } from './scale.js';
import { initEffectsSlider, resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showFailMessage, showSuccessMessage } from './messages.js';
import { handleChosePhoto } from './photo-loader.js';

const form = document.querySelector('.img-upload__form');
const uploadImgInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = overlay.querySelector('#upload-cancel');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentTextarea = overlay.querySelector('.text__description');
const submitButton = overlay.querySelector('.img-upload__submit');
const preview = document.querySelector('.img-upload__preview img');


const HASHTAGS_MAXCOUNT = 5;
const COMMENT_MAXLENGTH = 140;
const VALID_HASHTAG_STRING = /^#[a-zа-яё0-9]{1,}$/i;
const HASHTAG_MAXLENGTH = 20;
const errorMessages = {
  INVALID_HASHTAG_STRING: 'Хэш-тег должен начинаться с #, состоять из букв и чисел без пробелов',
  COMMENT_MAXLENGTH_ERROR: `Максимальная длина комментария ${COMMENT_MAXLENGTH} символов`,
  COUNT_ERROR: `Нельзя указать больше ${HASHTAG_MAXLENGTH} хэш-тегов`,
  HASHTAG_MAXLENGTH_ERROR: `Максимальная длина хэш-тега ${HASHTAG_MAXLENGTH} символов`,
  UNIQUENESS_ERROR: 'Хэш-теги не должны повторяться',
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Валидация тэгов

const getHashtags = (value) => value.trim().split(/\s+/);

const validateSymbols = (value) => !value || getHashtags(value).every((tag) => VALID_HASHTAG_STRING.test(tag));

const validateLength = (value) => !value || getHashtags(value).every((tag) => tag.length <= HASHTAG_MAXLENGTH);

const validateCount = (value) =>
  getHashtags(value).length <= HASHTAGS_MAXCOUNT;


const validateUniqueness = (value) => {
  const tags = getHashtags(value);
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(hashtagInput, validateSymbols, errorMessages.INVALID_HASHTAG_STRING);
pristine.addValidator(hashtagInput, validateLength, errorMessages.LENGTH_ERROR);
pristine.addValidator(hashtagInput, validateCount, errorMessages.COUNT_ERROR);
pristine.addValidator(hashtagInput, validateUniqueness, errorMessages.UNIQUENESS_ERROR);

// Валидация комментариев

const validateComment = (value) =>
  value.length <= COMMENT_MAXLENGTH;

pristine.addValidator(commentTextarea, validateComment, errorMessages.COMMENT_MAXLENGTH_ERROR);

// Проверка, является ли текстовое поле активным
const isFieldFocused = () =>
  document.activeElement === hashtagInput || document.activeElement === commentTextarea;


// Закрывает по escape
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    if (document.querySelector('.error')) {
      return;
    }
    evt.preventDefault();
    closeEditForm();
  }
};


const showEditForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};


// Закрывает
function closeEditForm () {
  form.reset();
  pristine.reset();
  scaleReset();
  resetEffects();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

// Закрывает по крестику
cancelButton.addEventListener('click', () => {
  closeEditForm();
});

const onFileInputChange = () => {
  if (handleChosePhoto(uploadImgInput, preview)) {
    showEditForm();
  }
};

const onSuccess = () => {
  showSuccessMessage();
  closeEditForm();
  unblockSubmitButton();
};

const onFail = () => {
  showFailMessage();
  unblockSubmitButton();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(onSuccess, onFail, new FormData(evt.target));
  }
};

const initForm = () => {
  initScale();
  initEffectsSlider();
  uploadImgInput.addEventListener('change', onFileInputChange);
  form.addEventListener('submit', onFormSubmit);
};

export { initForm, closeEditForm };

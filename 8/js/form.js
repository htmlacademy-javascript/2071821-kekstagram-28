import { isEscapeKey } from './utils.js';

const uploadImgInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

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

// Валидация тэгов

const getHashtags = (value) => {
  const tags = value.trim().split(/\s+/);
  return tags;
};

const validateSymbols = (value) => {
  getHashtags(value).every((tag) => VALID_HASHTAG_STRING.test(tag));
};

const validateLength = (value) => {
  getHashtags(value).every((tag) => tag.length <= HASHTAG_MAXLENGTH);
};

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
    evt.preventDefault();
    closeEditForm();
  }
};


const showEditForm = () => {
  overlay.classList.remove('visually-hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};


// Закрывает
function closeEditForm () {
  form.reset();
  pristine.reset();
  overlay.classList.add('visually-hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

// Закрывает по крестику
cancelButton.addEventListener('click', () => {
  closeEditForm();
});

const onFileInputChange = () => {
  showEditForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
};

uploadImgInput.addEventListener('change', onFileInputChange);
form.addEventListener('submit', onFormSubmit);


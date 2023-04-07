import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('.social__comment');
const commentsContainer = document.querySelector('.social__comments');
const COMMENTS_PORTION = 5;
let currentComments = [];
let start = 0;

// Создает комментарии
const createCommentsFragment = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    const userAvatar = newComment.querySelector('.social__picture');
    const userMessage = newComment.querySelector('.social__text');

    userAvatar.src = comment.avatar;
    userAvatar.alt = comment.name;
    userMessage.textContent = comment.message;

    commentsFragment.appendChild(newComment);
  });
  return commentsFragment;
};

// Отрисовывает порцию коментариев
const renderCommentsPortion = () => {
  const limit = start + COMMENTS_PORTION;
  if (currentComments.length <= limit) {
    commentsLoader.classList.add('hidden');

  } else {
    commentsLoader.classList.remove('hidden');

  }
  commentCount.textContent = `${Math.min(limit, currentComments.length)} из ${currentComments.length}`;

  const newComments = currentComments.slice(start, limit);
  const commentsPortion = createCommentsFragment(newComments);
  commentsContainer.appendChild(commentsPortion);
};


// Отрисовывает фото
const renderFullPhoto = (thumbnail) => {
  bigPicture.querySelector('.big-picture__img img').src = thumbnail.url;
  bigPicture.querySelector('.likes-count').textContent = thumbnail.likes;
  bigPicture.querySelector('.social__caption').textContent = thumbnail.description;
  bigPicture.querySelector('.big-picture__img img').alt = thumbnail.description;
  renderCommentsPortion(thumbnail.comments);
};

// Закрывает по escape
const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Закрывает
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

// Закрывает по крестику
closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

function onCommentsLoaderClick () {
  start += COMMENTS_PORTION;
  renderCommentsPortion();
}


// Открывает большое фото
const openBigPicture = (thumbnail) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  document.body.classList.add('modal-open');
  renderFullPhoto(thumbnail);
  commentsContainer.innerHTML = '';
  currentComments = thumbnail.comments;
  start = 0;
  renderCommentsPortion();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export { openBigPicture };

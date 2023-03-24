import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('.social__comment');
const commentsContainer = document.querySelector('.social__comments');
const COMMENTS_PORTION = 5;
// Создает комментарии
const renderComments = (comments) => {
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
const renderCommentsPortion = (comments) => {
  const newComments = comments.slice(commentsContainer.children.length,
    commentsContainer.children.length + COMMENTS_PORTION);
  const commentsPortion = renderComments(newComments);
  commentsContainer.appendChild(commentsPortion);
};

// Отрисовывает фото
const renderFullPhoto = (thumbnail) => {
  bigPicture.querySelector('.big-picture__img img').src = thumbnail.url;
  bigPicture.querySelector('.likes-count').textContent = thumbnail.likes;
  bigPicture.querySelector('.social__caption').textContent = thumbnail.description;
  bigPicture.querySelector('.big-picture__img img').alt = thumbnail.description;
  commentsContainer.innerHTML = '';
  renderCommentsPortion(thumbnail.coments);
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
}

// Закрывает по крестику
closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

const onCommentsLoaderClick = () => renderCommentsPortion();


// Открывает большое фото
const openBigPicture = (thumbnail) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  document.body.classList.add('modal-open');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  commentCount.classList.add('hidden');
  renderFullPhoto(thumbnail);
};

export { openBigPicture };

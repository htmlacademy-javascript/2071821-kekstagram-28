import { createPhotos } from './data.js';

// Находим контейнер для вставки изображений
const picturesContainer = document.querySelector('.pictures');

// Находим шаблон
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsArray = createPhotos(25);
// console.log(thumbnailsArray);
const picturesFragment = document.createDocumentFragment();

thumbnailsArray.forEach((photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__img').alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments;
  picturesFragment.appendChild(thumbnail);
});
const renderThumbnails = () => {
  picturesContainer.appendChild(picturesFragment);
};

export {renderThumbnails};

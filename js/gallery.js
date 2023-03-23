/*import { openBigPicture } from './big-photo.js';
import { renderThumbnails } from './render-thumbnails.js';

const container = document.querySelector('.pictures');

const renderFullscreenPhoto = (pictures) => {

  renderThumbnails(pictures);

  container.addEventListener('click', (evt) => {
    const thumbnailPicture = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnailPicture) {
      return;
    }
    const picture = pictures.find (
      (item) => item.id === +thumbnailPicture.dataset.thumbnailId
    );
    openBigPicture(picture);
  });

};

export { renderFullscreenPhoto };*/

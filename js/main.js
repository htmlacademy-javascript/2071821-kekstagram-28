//import { createPhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { initSorting } from './sorting.js';
import { showUploadedImage } from './photo-loader.js';

getData((data) => {
  renderThumbnails(data);
  initSorting(data);
});

initForm();
showUploadedImage();

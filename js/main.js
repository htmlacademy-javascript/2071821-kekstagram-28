//import { createPhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initForm } from './form.js';
import { getData } from './api.js';

getData((pictures) => {
  renderThumbnails(pictures);
});

initForm();

import { createPhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import './form.js';
import './scale.js';
import './effects.js';

renderThumbnails(createPhotos());

import { renderThumbnails } from './render-thumbnails.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { initSorting } from './sorting.js';
import { onUploadFail } from './messages.js';

getData((data) => {
  renderThumbnails(data);
  initSorting(data);
},
onUploadFail);

initForm();

//import { createPhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { initFilter } from './sorting.js';
import { setSortingButtonClick, getSortedData } from './sorting.js';


getData((pictures) => {
  renderThumbnails(pictures);
  setSortingButtonClick(() => getSortedData(pictures));
});

initForm();
initFilter();

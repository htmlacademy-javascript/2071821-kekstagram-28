//import { createPhotos } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { initSorting } from './sorting.js';
//import { setSortingButtonClick, getSortedData } from './sorting.js';


getData(renderThumbnails)
  .then(initSorting);

//setSortingButtonClick(() => getSortedData(pictures));


initForm();

//initSorting();

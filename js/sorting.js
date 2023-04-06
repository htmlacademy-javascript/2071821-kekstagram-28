import { renderThumbnails } from './render-thumbnails.js';
import { shuffleArray } from './utils.js';
import { debounce } from './utils.js';

const MAX_SHUFFLED_PHOTOS = 10;
const RENDER_DELAY = 500;

const sortingBlock = document.querySelector('.img-filters');

const sortByComments = (imgA, imgB) => imgB.comments.length - imgA.comments.length;

const showSortingBlock = () => sortingBlock.classList.remove('img-filters--inactive');

let currentButton = sortingBlock.querySelector('#filter-default');


const getSortedData = (data) => {
  const picturesToRemove = document.querySelectorAll('.picture');
  picturesToRemove.forEach((element) => element.remove());
  if (currentButton.id === 'filter-random') {
    return shuffleArray(data.slice()).slice(0, MAX_SHUFFLED_PHOTOS);
  }
  if (currentButton.id === 'filter-discussed') {
    return data.slice().sort(sortByComments);
  }
  return data;
};

const setSortingButtonClick = (cb) => {
  sortingBlock.addEventListener('click', debounce((evt) => {
    currentButton = evt.target;
    if (!currentButton.matches('.img-filters__button') ||
    currentButton.matches('.img-filters__button--active:not(#filter-random)')) {
      return;
    }
    sortingBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    currentButton.classList.add('img-filters__button--active');
    renderThumbnails(cb());
  }, RENDER_DELAY));
};


const initSorting = (pictures) => {
  showSortingBlock();
  setSortingButtonClick(() => getSortedData(pictures));
};

export { initSorting };


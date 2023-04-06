import { renderThumbnails } from './render-thumbnails.js';
import { shuffleArray } from './utils.js';
import { debounce } from './utils.js';

const RANDOM_COUNT = 10;
const RENDER_DELAY = 500;

const sortingBlock = document.querySelector('.img-filters');

const sortRandom = (data) => shuffleArray(data);

const sortByComments = (imgA, imgB) => imgB.comments.length - imgA.comments.length;

const showSortingBlock = () => sortingBlock.classList.remove('img-filters--inactive');

let currentButton = sortingBlock.querySelector('#filter-default');


const getSortedData = (data) => {
  const picturesToRemove = document.querySelectorAll('.picture');
  picturesToRemove.forEach((element) => element.remove());
  if (currentButton.id === 'filter-default') {
    return data;
  } else if (currentButton.id === 'filter-random') {
    return sortRandom(data.slice()).slice(0, RANDOM_COUNT);
  } else if (currentButton.id === 'filter-discussed') {
    return data.slice().sort(sortByComments);
  }
};

const setSortingButtonClick = (cb, data) => {
  sortingBlock.addEventListener('click', debounce((evt) => {
    currentButton = evt.target;
    if (!currentButton.matches('.img-filters__button') || currentButton.matches('.img-filters__button--active')) {
      return;
    }
    sortingBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    currentButton.classList.add('img-filters__button--active');
    renderThumbnails(cb(data));
  }, RENDER_DELAY));
};


const initFilter = () => {
  showSortingBlock();
};

export { initFilter, setSortingButtonClick, getSortedData };


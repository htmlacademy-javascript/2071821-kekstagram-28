const NUMBER_OF_PHOTOS = 25;
const NUMBER_OF_AVATARS = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const NUMBER_OF_COMMENTS = 3;
const PHOTO_DESCRIPTIONS = [
  'Жизнь прекрасна!',
  'Идеальный завтрак',
  'Типичная суббота',
  'Спасибо за отличный день',
  'Воскресная прогулка',
  'Наконец то мы собрались',
  'А вы бывали тут?',
  'На память',
  'Очень рекомендую посетить',
  'Идеальный завтрак',
  'Сегодня такой странный день',
  'Как тихо',
  'Мгновение',
  'Все, что я люблю...',
  'Кто рано встает, тот не высыпается',
  'Невозможно пройти мимо',
  'Самое нелюбимое время',
  'Вместе теплее',
  'Не верится',
  'Вот жизнь была!',
  'Прямо сейчас в параллельной вселенной',
  'И снова здравствуйте',
  'Миллион лет назад',
  'Фантастика!',
  'Новости к этому часу',
  'Трудовые будни',
];

const COMMENTATOR_NAMES = [
  'Алена',
  'Юрий',
  'Ната',
  'Кирилл',
  'Алекс',
  'Виктория',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//Генератор уникальных айди (порядковые числа, начиная с)
const createIdGenerator = (start) => () => {
  start += 1;
  return start;
};
const generatePhotoId = createIdGenerator(0);
const generateUrlId = createIdGenerator(0);

// ф-ция, кот. генерирует случайное положит число из диапазона

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//ф-цияб кот. генерирует случайный уникальный айди из диапазона

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция, создающая текст комментария:
const createMessage = () =>
  Array.from({length: getRandomInteger(1, 2)},() => (getRandomArrayElement(COMMENTS))).join('');

//Функция, создающая объект комментарий:
const createCommentObject = () => {
  const generateId = createRandomIdFromRangeGenerator(1, 300);
  return {
    id: generateId(),
    avatar: `img/avatar-${ getRandomInteger(1, NUMBER_OF_AVATARS) }.svg`,
    message: createMessage(),
    name: getRandomArrayElement(COMMENTATOR_NAMES)
  };
};

createCommentObject();

//Функция, создающая объект фото:

const createPhotoObject = () => {
  const likesAmount = createRandomIdFromRangeGenerator(LIKES_MIN, LIKES_MAX);
  return {
    id: generatePhotoId(),
    url: `photos/${ generateUrlId() }.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: likesAmount(),
    coments: Array.from({length:getRandomInteger(0,NUMBER_OF_COMMENTS)}, createCommentObject)
  };
};
createPhotoObject();

const photos = () => Array.from({length: NUMBER_OF_PHOTOS}, createPhotoObject);
photos();

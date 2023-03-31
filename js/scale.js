const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DAFAULT = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleControleField = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
let currentValue = 100;

const scaleImage = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleControleField.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  currentValue = parseInt(scaleControleField.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  currentValue = parseInt(scaleControleField.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  scaleImage(newValue);
};


smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

const scaleReset = () => scaleImage(SCALE_DAFAULT);

export { scaleReset };

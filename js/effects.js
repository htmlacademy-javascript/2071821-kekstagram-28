//const effectButtons = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsContainer = document.querySelector('.effects');
const MIN_SLIDER_RANGE = 1;
const MAX_SLIDER_RANGE = 100;

const EFFECTS__DATA = [
  { name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  { name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  { name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },

  { name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },

  { name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },

  { name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  }
];
const DEFAULT_EFFECT = EFFECTS__DATA.slice(-1);
let chosenEffect = DEFAULT_EFFECT;

noUiSlider.create(effectLevelSlider,{
  range: {
    min: MIN_SLIDER_RANGE,
    max: MAX_SLIDER_RANGE,
  },
  start: MAX_SLIDER_RANGE,
  step: 1,
  connect: 'lower'
});


const isDefault = () => {
  if (chosenEffect === DEFAULT_EFFECT) {
    effectLevelContainer.classList.add('hidden');
  } else {
    effectLevelContainer.classList.remove('hidden');
  }
};

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  isDefault();
};

// Обработчик смены эффекта
const onEffectButtonChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  chosenEffect = EFFECTS__DATA.find((effect) => effect.name === evt.target.value);
  imagePreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  effectLevelInput.value = effectLevelSlider.noUiSlider.get();
  imagePreview.style.filter = `${chosenEffect.filter}(${effectLevelInput.value}${chosenEffect.unit})`;
};

effectsContainer.addEventListener('change', onEffectButtonChange);
effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

export { resetEffects };

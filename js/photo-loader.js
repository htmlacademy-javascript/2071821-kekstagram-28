import { showAlert } from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const handleChosePhoto = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    return true;
  }
  showAlert('Невозможно загрузить файл данного формата');
  return false;
};

export { handleChosePhoto };

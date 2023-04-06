import { showAlert } from './utils.js';
import { closeEditForm } from './form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const showUploadedImage = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    } else {
      showAlert('Невозможно загрузить файл данного формата');
      closeEditForm();
    }
  });
};

export { showUploadedImage };

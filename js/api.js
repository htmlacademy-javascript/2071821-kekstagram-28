const getData = (onSuccess) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    });

};

const sendData = (onSuccess, onFail, body) => {
  fetch ('https://28.javascript.pages.academ/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Данные невалидны');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте еще раз');
    });
};


export { getData, sendData };

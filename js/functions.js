/*const verifyLength = (string, referenceLenth) => {
  if (string.length <= referenceLenth) {
    console.log('Length is correct');
    return true;
  }
  console.log('Length is invalid');
  return false;
};
ниже код преобразован в оптимальный вид*/

const verifyLength = (string, referenceLenth) =>
  string.length <= referenceLenth;

// verifyLength('Good morning', 10);

const isPalindrome = (string) => {
  const stringToCheck = string.toLowerCase().replaceAll(' ', '');
  let checkOfLetter;
  for (let i = 0; i < string.length / 2; i++) {
    checkOfLetter = (stringToCheck.at(i) === stringToCheck.at(stringToCheck.length - i - 1));
    if (checkOfLetter === false){
      break;
    }
  }
  return checkOfLetter;
};

//isPalindrome('abrAcad carba ');


const getNumber = (string) => {
  let number = '';
  string = string + '';
  for(let i = 0; i < string.length; i++){
    const character = parseInt(string[i], 10);
    if (!isNaN(character)) {
      number = number + character;
    }
  }
  return parseInt(number, 10);
};

//console.log(getNumber(2023));

const addSymbols = (string, minLength, extention) => {
  let result = string;
  while (result.length < minLength) {
    const newResultLength = result.length + extention.length;
    let newExtention;
    if (newResultLength <= minLength){
      newExtention = extention;
    } else {
      newExtention = extention.slice(0, minLength - newResultLength);
    }
    result = newExtention + result;
  }
  return result;
};

//addSymbols('q', 4, 'we');

function verifyLength(string, referenceLenth) {
  if (string.length <= referenceLenth) {
    console.log('Length is correct');
    return true;
  }
  console.log('Length is invalid');
  return true;
}

verifyLength('Good morning', 10);

function isPalindrome(string) {
  const stringToCheck = string.toLowerCase().replaceAll(' ', '');
  let checkOfLetter;
  for (let i = 0; i < string.length / 2; i++) {
    checkOfLetter = (stringToCheck.at(i) === stringToCheck.at(stringToCheck.length - i - 1));
    if (checkOfLetter === false){
      console.log('no');
      break;
    }
    console.log('yes');
  }

  return checkOfLetter;
}

isPalindrome('abrAcad carba ');


function getNumber(string) {
  let number = '';
  string = string + '';
  for(let i = 0; i < string.length; i++){
    const character = parseInt(string[i], 10);
    if (!isNaN(character)) {
      number = number + character;
    }
  }
  return parseInt(number, 10);
}
console.log(getNumber(2023));

function addSymbols(string, minLength, aditionalString) {
  if(string.length > minLength){
    return(string);
  }
}

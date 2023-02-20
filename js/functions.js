function verifyLength(string, referenceLenth) {
  if (string.length <= referenceLenth) {
    console.log('Length is correct');
    return true;
  }
  console.log('Length is invalid');
  return true;
}

verifyLength('Good morning', 10);
/*
function isPalindrome(string) {
  let i = 0;
  while (i < string.length / 2) {
    if(string[i] === string[string.length - (i + 1)]){
      i++;
      console.log(i);
    }
    console.log('not');
    break;
  }
  console.log('palindrome');
}

isPalindrome('abracadabra');
*/

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

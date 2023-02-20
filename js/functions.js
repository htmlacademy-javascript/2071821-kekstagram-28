function verifyLength(string, referenceLenth) {
  if (string.length <= referenceLenth) {
    console.log('Length is correct');
    return true;
  }
  console.log('Length is invalid');
  return true;
}

verifyLength('Good morning', 10);

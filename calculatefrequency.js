function calculateFrequency(string) {
  let char , i = 0;    
  const object = {};
  for(i; i < string.length; i++) {
    if(string.charCodeAt(i) > 96 && string.charCodeAt(i) < 123) {
      char = string.charAt(i);
      if(object[char] == undefined) {               
        object[char] = 1;
      } else {
          object[char] += 1;
      }
    } else {
        continue;
    }
  }
  return object;
}

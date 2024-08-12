/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase().split(/[ .:;?!~,`&|()<>{}\[\]\r\n/\\]+/).join("");
  const reverse = str.split("").reverse().join("");

  console.log(reverse, str);
  if(str === reverse) {
    return true;
  } else {
    return false;
  }
  
}

module.exports = isPalindrome;

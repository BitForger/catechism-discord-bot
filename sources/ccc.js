const fs = require("fs");
const bigString = require("./bigString");
let array = [];

function splitParagraph(str) {
  let idStr = str.split(".")[0];
  let newStr = str.split(".");
  newStr.shift();
  newStr.toString();
  let textStr = newStr.join(" ");

  makeArrayofObjects(idStr, textStr);
}

function makeArrayofObjects(idStr, textStr) {
  let newObj = { id: idStr, text: textStr };
  array.push(newObj);
}

function bigStringToSmallStrings(bigStr) {
  let arrayStr = bigStr.split("Paragraph ");
  let newArrayStr = arrayStr.filter((n) => n);
  newArrayStr.forEach((paragraph) => splitParagraph(paragraph));
  return array;
}

let testStr = bigString.bigString;

let ccc = bigStringToSmallStrings(testStr);

module.exports = { ccc };

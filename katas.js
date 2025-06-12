function alphabetReplace(string) {
  /*
  This function that accepts a string of any length, and replaces each letter within each word with the corresponding index that that letter has in the alphabet.
  
  You must have a space between each index number, and do NOT need to account extra for spaces between words.
    */
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return string
    .toLowerCase()
    .split("")
    .filter((char) => char !== " ")
    .map((letter) => alphabet.indexOf(letter) + 1)
    .join(" ");
}

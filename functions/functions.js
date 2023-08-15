export function resizeImgurImages(input) {
  const smallImg = input.replace(".png", "s.png");
  return smallImg;
}

export function transformString(inputString) {
  let stringWithHyphens = inputString.replace(/ /g, "-");

  let lowercaseString = stringWithHyphens.toLowerCase();

  return lowercaseString;
}

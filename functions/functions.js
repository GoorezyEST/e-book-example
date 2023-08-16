export function resizeImgurImages(input) {
  const smallImg = input.replace(".png", "s.png");
  return smallImg;
}

export function transformString(inputString) {
  let stringWithHyphens = inputString.replace(/ /g, "-");

  let lowercaseString = stringWithHyphens.toLowerCase();

  return lowercaseString;
}

export function formatPrice(price) {
  const numericValue = parseFloat(price);
  const priceStr = numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&.");
  return "$ " + priceStr.replace(".00", ",00");
}

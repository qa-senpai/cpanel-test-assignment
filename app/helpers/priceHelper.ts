export function getPriceAsNumber(price: string) {
  const cleanPrice = price!.match(/\$\d+\.\d{2} USD/);
  const number = Number(cleanPrice![0].match(/\d+\.\d{2}/));

  if (!isNaN(number)) return number;
  else throw Error(`Can't parse ${price}`);
}

export function getCleanPriceAsString(price: string) {
  const cleanPrice = price!.match(/\$\d+\.\d{2} USD/);
  return cleanPrice![0];
}

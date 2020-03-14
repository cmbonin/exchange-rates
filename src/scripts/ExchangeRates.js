
export async function getConversionRate(currencyBase, currencyTo) {
  const results = await fetchRates(currencyBase);
  return await results.rates[currencyTo];
}

export async function fetchRates (currency) {
  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`);
  return await res.json();
};

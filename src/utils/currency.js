import localforage from 'localforage';

const foxCurrency = 'fox-pay-currency';

export function setBaseCurrency(currency) {
  return localforage.setItem(foxCurrency, currency);
}

export function removeBaseCurrency() {
  return localforage.removeItem(foxCurrency);
}

export async function getLocalBaseCurrency() {
  const currency = await localforage.getItem(foxCurrency);
  if (!currency) {
    setBaseCurrency('CNY');
    return 'CNY';
  }
  return currency;
}

export function formatPrice(value) {
  const v = value * 1;
  if (!v || Number.isNaN(v)) return 0;

  const model = window.g_app._store.getState().asset;
  const localCurrency = model.baseCurrency;
  let result = v;

  if (localCurrency === 'CNY') {
    return result;
  }

  if (localCurrency === 'USD') {
    if (model && model.currency && Object.keys(model.currency) !== 0 && model.currency.currencies && model.currency.currencies.usd) {
      const usdRate = parseFloat(model.currency.currencies.usd);
      result /= usdRate;
      return parseFloat(result.toFixed(2));
    }
  }
  return result;
}

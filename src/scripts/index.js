import {getConversionRate} from './ExchangeRates.js';
import Currencies from './currencies';
import '../styles/index.scss';

const DEFAULT_BASE = 'AUD';
const DEFAULT_TO = 'EUR';

(() => {

  // Debouncer
  const debounce = (func, delay) => {
    let interval;
    return (...args) => {
        const next = () => func(...args);
        if (interval) {
            clearTimeout(interval);
        }
        interval = setTimeout(next, delay);
    };
  };  

  // Initialise some element references
  const baseCurrency = document.getElementById('base-currency') || [];
  const toCurrency = document.getElementById('to-currency') || [];
  const baseAmount = document.getElementById('base-amount') || [];
  const toAmount = document.getElementById('to-amount') || [];

  // Populate the drop downs with currency options
  const loadCurrencyOptions = (selectElem, selection) => {

    if (!selectElem) return;
    const optionsHTML = '';
    const listOptions = Currencies.reduce((optionsHTML, currentValue) => 
      optionsHTML += `<option value='${currentValue}' ${selection === currentValue ? 'selected' : ''}>${currentValue}</option>`
    );
    selectElem.innerHTML = listOptions;
    return false;
  };
  
  // Update the exchange rate based on chosen currencies and rates
  const updateRates = async (baseCurrencyVal, toCurrencyVal) => {
    const exchangeRate = await getConversionRate(baseCurrencyVal, toCurrencyVal);
    const baseVal = baseAmount.value || baseAmount.placeholder;
    toAmount.value = baseVal * exchangeRate;
  };
  
  // Debouncer for rates change
  const updateRatesDebounced = debounce(() => 
    updateRates(baseCurrency.value, toCurrency.value)
  , 800);

  // Initialise the curency selection fields
  loadCurrencyOptions(baseCurrency, DEFAULT_BASE);
  loadCurrencyOptions(toCurrency, DEFAULT_TO);

  // Initialise update rate events to the currency select fields & 
  baseCurrency.addEventListener('change', () => updateRatesDebounced());
  toCurrency.addEventListener('change', () => updateRatesDebounced());
  baseAmount.addEventListener('change', () => updateRatesDebounced());

})();

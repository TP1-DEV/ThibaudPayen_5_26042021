// GET DATA
const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Serveur status :", response.status);
    }
  } catch (error) {
    console.error(error);
  }
};

// GET URLSEARCHPARAMS
const getSearchParams = (variable) => {
  const searchParams = new URLSearchParams(document.location.search);
  return searchParams.get(variable);
};

// FORMATING PRICE
const formatPrice = (price, taxes = false) => {
  const priceString = price.toString();
  const centsIndex = priceString.length - 2;
  const centsValue = priceString.substring(centsIndex);
  const integerValue = priceString.substring(0, centsIndex);
  let formatedPrice = integerValue;
  if (centsValue !== "00") {
    formatedPrice += "," + centsValue;
  }
  formatedPrice += "€";
  if (taxes) {
    formatedPrice += " TTC";
  }
  return numberWithSpaces(formatedPrice);
};

// SPACING NUMBERS
function numberWithSpaces(variable) {
  return variable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// SET MULTIPLE ATTRIBUTES
const setAttributes = (element, attributes) => {
  for (let key in attributes ) {
    element.setAttribute(key, attributes[key])
  }
}

// OPTION SELECTED
const optionSelected = (selectId) => {
  const selected = document.getElementById(selectId);
  let result = selected.options[selected.selectedIndex].value;
  return result;
};

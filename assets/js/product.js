// EXECUTE ON LOAD
window.onload = () => {
  addItemCard();
  const cart = Cart.getCart();
  cart.updateHeader();
};
// ADD PRODUCT TO DOCUMENT
const addItemCard = async () => {
  // FETCH DATA
  const url = "http://localhost:3000/api/teddies/" + getSearchParams("id");
  const product = await getData(url);
  // GET DOM ELEMENT
  const productMain = document.getElementById("product-main");
  // CREATE CARD
  const cardContainer = createElementFactory("div", { class: "card-container" }, productMain);
  createCard(cardContainer, product, false, true);
  // GET DOM ELEMENT
  const footer = document.querySelector(".card-box-body-price");
  const body = document.querySelector(".card-box-body");
  // CREATE OPTIONS
  createColorOptions(footer, body, product);
  // ADD PRODUCT TO CART
  const button = document.getElementById("addToCart");
  buttonAddToCart(button, product);
};

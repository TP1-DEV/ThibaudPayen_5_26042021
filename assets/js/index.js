// EXECUTE ON LOAD
window.onload = () => {
  addItemsCards();
  const cart = Cart.getCart();
  cart.updateHeader();
};
// ADD PRODUCTS TO DOCUMENT
const addItemsCards = async () => {
  // FETCH DATA
  const url = "http://localhost:3000/api/teddies/";
  const products = await getData(url);
  // GET DOM ELEMENT
  const indexSection = document.getElementById("index-section");
  // CREATE CARDS
  const cardContainer = createElementFactory("div", { class: "card-container" }, indexSection);
  for (let product of products) {
    createCard(cardContainer, product, true, true);
  }
};

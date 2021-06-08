// EXECUTE ON LOAD
window.onload = () => {
  addItemsCards();
  const cart = Cart.getCart();
  cart.updateHeader();
};
// ADD PRODUCTS TO DOCUMENT
const addItemsCards = async () => {
  const products = await getData(url);
  const indexSection = document.getElementById("index-section");
  const cardContainer = createElementFactory("div", { class: "card-container" }, indexSection);
  for (let product of products) {
    createCard(cardContainer, product, true, true);
  }
};

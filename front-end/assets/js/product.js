// EXECUTE ON LOAD
window.onload = () => {
  addItemCard();
  const cart = Cart.getCart();
  cart.updateHeader();
};
// ADD PRODUCT TO DOCUMENT
const addItemCard = async () => {
  const product = await getData(url + getSearchParams("id"));
  const productMain = document.getElementById("product-main");
  const cardContainer = createElementFactory("div", { class: "card-container" }, productMain);
  createCard(cardContainer, product, false, true);
  const footer = document.querySelector(".card-box-body-price");
  const body = document.querySelector(".card-box-body");
  createColorOptions(footer, body, product);
  const button = document.getElementById("addToCart");
  buttonAddToCart(button, product);
};

// CREATE OPTIONS SELECT
const createColorOptions = (element1, element2, items) => {
  const inputGroup = createElementFactory("div", { class: "input-group" }, element1);
  const inputGroupPrepend = createElementFactory("div", { class: "input-group-prepend" }, inputGroup);
  const label = createElementFactory("label", { class: "input-group-text", for: "inputGroupSelect01" }, inputGroupPrepend);
  label.textContent = "Couleurs";
  const customSelect = createElementFactory("select", { class: "select-color", id: "inputGroupSelect01" }, inputGroup);
  for (const color of items.colors) {
    const options = createElementFactory("option", { value: color }, customSelect);
    options.textContent = color;
  }
  const button = createElementFactory("button", { class: "btn", id: "addToCart" }, element2);
  button.textContent = "Ajouter au panier";
};

// EXECUTE ON LOAD
window.onload = () => {
  addItemCard();
  updateCartInfo();
};

// ADD PRODUCT TO DOCUMENT
const addItemCard = async () => {
  // FETCH DATA
  const url = "http://localhost:3000/api/teddies/" + getSearchParams("id");
  const product = await getData(url);

  // GET DOM ELEMENT
  const mainProduct = document.getElementById("main-product");

  // CREATE <div> = CARD
  const cardBox = createElementFactory("div", { class: "row row-cols-1 products my-4" }, mainProduct);

  // CREATE <article> = ARTICLE
  const card = createElementFactory("article", { class: "col my-4" }, cardBox);

  // CREATE <div> = BOX
  const box = createElementFactory("div", { class: "card flex-md-row shadow" }, card);

  // CREATE <img> = IMG
  const img = createElementFactory("img", { class: "card-img-top card-product" }, box);
  img.src = product.imageUrl;

  // CREATE <div> = BODY
  const body = createElementFactory("div", { class: "card-body d-flex flex-column" }, box);

  // CREATE <h5> = TITLE
  const title = createElementFactory("h5", { class: "card-title font-weight-bold" }, body);
  title.textContent = product.name;

  // CREATE <p> = DESC
  const desc = createElementFactory("p", { class: "card-text my-auto text-justify font-weight-bold" }, body);
  desc.textContent = product.description;

  // CREATE <div> = FOOTER
  const footer = createElementFactory("div", { class: "card-price d-flex justify-content-between" }, body);

  // CREATE <div> = INPUT
  const inputGroup = createElementFactory("div", { class: "input-group mb-4" }, footer);

  // CREATE <div> = INPUTPREPEND
  const inputGroupPrepend = createElementFactory("div", { class: "input-group-prepend" }, inputGroup);

  // CREATE <label> = LABEL
  const label = createElementFactory("label", { class: "input-group-text label-color font-weight-bold", for: "inputGroupSelect01" }, inputGroupPrepend);
  label.textContent = "Couleurs";

  // CREATE <select> = CUSTOMSELECT
  const customSelect = createElementFactory("select", { class: "select-color font-weight-bold", id: "inputGroupSelect01" }, inputGroup);

  // CREATE <option> = OPTIONS
  for (const color of product.colors) {
    const options = createElementFactory("option", { class: "font-weight-bold", value: color }, customSelect);
    options.textContent = color;
  }

  // CREATE <p> = PRICE
  const price = createElementFactory("p", { class: "price my-0 font-weight-bold" }, footer);
  price.textContent = formatPrice(product.price, true);

  // CREATE <button> = BUTTON
  const button = createElementFactory("button", { class: "btn btn-light btn-color mt-4 font-weight-bold", id: "addToCart" }, body);
  button.textContent = "Ajouter au panier";

  // ADD PRODUCT TO CART
  button.addEventListener("click", () => {
    const cart = new Cart();
    const selectedOption = document.getElementById("inputGroupSelect01").value;
    cart.addItem(product._id, selectedOption, product.price);
    cart.update();
  });
};

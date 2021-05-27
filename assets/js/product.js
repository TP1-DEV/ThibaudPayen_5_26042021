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
  const card = document.createElement("div");
  mainProduct.appendChild(card);
  card.classList.add("row", "row-col-1", "products", "my-4");

  // CREATE <article> = ARTICLE
  const article = document.createElement("article");
  card.appendChild(article);
  article.classList.add("col", "my-4");

  // CREATE <div> = BOX
  const box = document.createElement("div");
  article.appendChild(box);
  box.classList.add("card", "flex-md-row", "shadow");

  // CREATE <img> = IMG
  const img = document.createElement("img");
  box.appendChild(img);
  img.classList.add("card-img-top", "card-product");
  img.src = product.imageUrl;

  // CREATE <div> = BODY
  const body = document.createElement("div");
  box.appendChild(body);
  body.classList.add("card-body", "d-flex", "flex-column");

  // CREATE <h5> = TITLE
  const title = document.createElement("h5");
  body.appendChild(title);
  title.classList.add("card-title", "font-weight-bold");
  title.textContent = product.name;

  // CREATE <p> = DESC
  const desc = document.createElement("p");
  body.appendChild(desc);
  desc.classList.add("card-text", "my-auto", "text-justify", "font-weight-bold");
  desc.textContent = product.description;

  // CREATE <div> = FOOTER
  const footer = document.createElement("div");
  body.appendChild(footer);
  footer.classList.add("card-price", "d-flex", "justify-content-between");

  // CREATE <div> = INPUT
  const inputGroup = document.createElement("div");
  footer.appendChild(inputGroup);
  inputGroup.classList.add("input-group", "mb-4");

  // CREATE <div> = INPUTPREPEND
  const inputGroupPrepend = document.createElement("div");
  inputGroup.appendChild(inputGroupPrepend);
  inputGroupPrepend.classList.add("input-group-prepend");

  // CREATE <label> = LABEL
  const label = document.createElement("label");
  inputGroupPrepend.appendChild(label);
  label.classList.add("input-group-text", "label-color", "font-weight-bold");
  label.setAttribute("for", "inputGroupSelect01");
  label.textContent = "Couleurs";

  // CREATE <select> = CUSTOMSELECT
  const customSelect = document.createElement("select");
  inputGroup.appendChild(customSelect);
  customSelect.setAttribute("id", "inputGroupSelect01");
  customSelect.classList.add("select-color", "font-weight-bold");

  // CREATE <option> = OPTIONS
  for (const color of product.colors) {
    const options = document.createElement("option");
    customSelect.appendChild(options);
    options.classList.add("font-weight-bold");
    options.setAttribute("value", color);
    options.textContent = color;
  }

  // CREATE <p> = PRICE
  const price = document.createElement("p");
  footer.appendChild(price);
  price.classList.add("price", "font-weight-bold", "my-0");
  price.textContent = formatPrice(product.price, true);

  // CREATE <button> = BUTTON
  const button = document.createElement("button");
  body.appendChild(button);
  button.classList.add("btn", "btn-light", "mt-4", "font-weight-bold", "btn-color");
  button.setAttribute("id", "addToCart");
  button.textContent = "Ajouter au panier";

  // ADD PRODUCT TO CART
  button.addEventListener("click", () => {
    const cart = new Cart();
    const selectedOption = document.getElementById("inputGroupSelect01").value;
    cart.addItem(product._id, selectedOption, product.price);
    updateCartInfo();
  });
};

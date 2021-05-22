// MAIN FUNCTION
const main = async () => {
  const url = "http://localhost:3000/api/teddies/" + getSearchParams("id");
  const product = await getData(url);
  addItemCard(product);
  addToCart(product);
};

// ADD PRODUCT TO DOCUMENT
const addItemCard = (product) => {
  const mainProduct = document.getElementById("main-product");

  const card = document.createElement("div");
  mainProduct.appendChild(card);
  card.classList.add("row", "row-col-1", "products", "my-4");

  const article = document.createElement("article");
  card.appendChild(article);
  article.classList.add("col", "my-4");

  const box = document.createElement("div");
  article.appendChild(box);
  box.classList.add("card", "flex-md-row", "shadow");

  const img = document.createElement("img");
  box.appendChild(img);
  img.classList.add("card-img-top", "card-product");
  img.src = product.imageUrl;

  const body = document.createElement("div");
  box.appendChild(body);
  body.classList.add("card-body", "d-flex", "flex-column");

  const title = document.createElement("h5");
  body.appendChild(title);
  title.classList.add("card-title", "font-weight-bold");
  title.textContent = product.name;

  const desc = document.createElement("p");
  body.appendChild(desc);
  desc.classList.add("card-text", "my-auto", "text-justify", "font-weight-bold");
  desc.textContent = product.description;

  const footer = document.createElement("div");
  body.appendChild(footer);
  footer.classList.add("card-price", "d-flex", "justify-content-between");

  const inputGroup = document.createElement("div");
  footer.appendChild(inputGroup);
  inputGroup.classList.add("input-group", "mb-4");

  const inputGroupPrepend = document.createElement("div");
  inputGroup.appendChild(inputGroupPrepend);
  inputGroupPrepend.classList.add("input-group-prepend");

  const label = document.createElement("label");
  inputGroupPrepend.appendChild(label);
  label.classList.add("input-group-text", "label-color", "font-weight-bold");
  label.setAttribute("for", "inputGroupSelect01");
  label.textContent = "Couleurs";

  const customSelect = document.createElement("select");
  inputGroup.appendChild(customSelect);
  customSelect.setAttribute("id", "inputGroupSelect01");
  customSelect.classList.add("select-color", "font-weight-bold");

  const colors = product.colors;
  const options = document.createElement("option");
  customSelect.appendChild(options);
  options.classList.add("font-weight-bold");
  options.textContent = "Faites votre choix";
  for (const color of colors) {
    const options = document.createElement("option");
    customSelect.appendChild(options);
    options.classList.add("font-weight-bold");
    options.setAttribute("value", color);
    options.textContent = color;
  }

  const price = document.createElement("p");
  footer.appendChild(price);
  price.classList.add("price", "font-weight-bold", "my-0");
  price.textContent = formatPrice(product.price, true);

  const button = document.createElement("button");
  body.appendChild(button);
  button.classList.add("btn", "btn-light", "mt-4", "font-weight-bold", "btn-color");
  button.setAttribute("id", "addToCart");
  button.textContent = "Ajouter au panier";
};

// ADD PRODUCT TO CART
const addToCart = (item) => {
  document.getElementById("addToCart").addEventListener("click", () => {
    const cart = new Cart()
    let selectedOption = document.getElementById("inputGroupSelect01").value;
    cart.addItem(item._id, selectedOption, item.price)
  });
};

// ON LOAD
document.onload = main();

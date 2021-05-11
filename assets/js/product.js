// MAIN FUNCTION
const main = async () => {
  const url = "http://localhost:3000/api/teddies/" + getSearchParams("id")
  const products = await getData(url);
  addProductsCard(products);
};

// ADD PRODUCTS TO DOCUMENT
const addProductsCard = (products) => {
  const mainProduct = document.getElementById("main-product");

  const card = document.createElement("div");
  mainProduct.appendChild(card);
  card.classList.add("row", "row-col-1", "products", "my-4");

  const article = document.createElement("article");
  card.appendChild(article);
  article.classList.add("col", "my-4");

  const box = document.createElement("div");
  article.appendChild(box);
  box.classList.add("card", "h-100", "flex-md-row", "shadow");

  const img = document.createElement("img");
  box.appendChild(img);
  img.classList.add("card-img-top", "card-product");
  img.src = products.imageUrl;

  const body = document.createElement("div");
  box.appendChild(body);
  body.classList.add("card-body", "d-flex", "flex-column");

  const title = document.createElement("h5");
  body.appendChild(title);
  title.classList.add("card-title", "font-weight-bold");
  title.textContent = products.name;

  const desc = document.createElement("p");
  body.appendChild(desc);
  desc.classList.add("card-text", "my-auto", "text-justify", "font-weight-bold");
  desc.textContent = products.description;

  const footer = document.createElement("div");
  body.appendChild(footer);
  footer.classList.add("card-price", "d-flex", "justify-content-between");

  const dropDown = document.createElement("div")
  footer.appendChild(dropDown)
  dropDown.classList.add("dropdown")

  const buttonColorList = document.createElement("div");
  dropDown.appendChild(buttonColorList);
  buttonColorList.classList.add("btn", "btn-outline-secondary", "dropdown-toggle", "btn-color", "font-weight-bold");
  setAttributes(buttonColorList, {"id": "dropdownMenuButton", "type": "button", "data-toggle": "dropdown"})
  buttonColorList.textContent = "Coloris"

  const menu = document.createElement("div");
  dropDown.appendChild(menu);
  menu.classList.add("dropdown-menu");

  const colors = products.colors;
  for (let color of colors) {
    const listMenu = document.createElement("a");
    menu.appendChild(listMenu);
    listMenu.classList.add("dropdown-item");
    listMenu.textContent = color;
  }

  const price = document.createElement("p");
  footer.appendChild(price);
  price.classList.add("price", "font-weight-bold", "my-0");
  price.textContent = formatPrice(products.price, true);

  const button = document.createElement("button");
  body.appendChild(button);
  button.classList.add("btn", "btn-light", "mt-4", "font-weight-bold", "btn-color");
  button.textContent = "Ajouter au panier";
};

// ON LOAD
document.onload = main();
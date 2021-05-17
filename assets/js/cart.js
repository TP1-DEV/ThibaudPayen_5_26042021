// MAIN FUNCTION
const main = async () => {
  addItemsCards();
};

const addItemsCards = async () => {
  const cart = new Cart();
  const url = "http://localhost:3000/api/teddies/";
  const items = document.getElementById("items");
  for (let item of cart.getItems()) {
    const product = await getData(url + item.id);

    const article = document.createElement("article");
    items.appendChild(article);
    article.classList.add("row");

    const box = document.createElement("div");
    article.appendChild(box);
    box.classList.add("row");

    const img = document.createElement("img");
    box.appendChild(img);
    img.src = product.imageUrl;
    img.classList.add("col-3", "w-25");

    const desc = document.createElement("div");
    box.appendChild(desc);
    desc.classList.add("col-4");

    const name = document.createElement("p");
    desc.appendChild(name);
    name.classList.add("row", "font-weight-bold");
    name.textContent = product.name;

    const color = document.createElement("p");
    desc.appendChild(color);
    color.classList.add("row", "font-weight-bold");
    color.textContent = item.color;

    const quantity = document.createElement("div");
    box.appendChild(quantity);
    quantity.classList.add("col", "d-flex", "justify-content-center", "quantity");

    const down = document.createElement("span");
    quantity.appendChild(down);
    down.classList.add("down", "font-weight-bold");
    down.textContent = "-";

    const quantityNumber = document.createElement("input");
    quantity.appendChild(quantityNumber);
    quantityNumber.classList.add("text-center", "mx-1", "font-weight-bold");
    quantityNumber.setAttribute("type", "text");
    quantityNumber.setAttribute("value", "1");

    const up = document.createElement("span");
    quantity.appendChild(up);
    up.classList.add("up", "font-weight-bold");
    up.textContent = "+";

    const price = document.createElement("div");
    box.appendChild(price);
    price.classList.add("col", "font-weight-bold");
    price.textContent = formatPrice(product.price);

    const remove = document.createElement("div");
    box.appendChild(remove);
    remove.classList.add("col");

    const iconRemove = document.createElement("i");
    remove.appendChild(iconRemove);
    remove.classList.add("fas", "fa-trash");
  }
  const backToHome = document.createElement("a");
  items.appendChild(backToHome);
  backToHome.classList.add("d-flex", "align-item-center", "my-3");
  backToHome.href = "index.html";

  const backArrow = document.createElement("i");
  backToHome.appendChild(backArrow);
  backArrow.classList.add("fas", "fa-arrow-left", "pt-1");

  const textBackArrow = document.createElement("span");
  backToHome.appendChild(textBackArrow);
  textBackArrow.classList.add("mx-2", "font-weight-bold");
  textBackArrow.textContent = "Retour acceuil";
};

// ON LOAD
document.onload = main();

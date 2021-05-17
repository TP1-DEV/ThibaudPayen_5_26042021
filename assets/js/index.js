// MAIN FUNCTION
const main = async () => {
  const url = "http://localhost:3000/api/teddies/"
  const products = await getData(url);
  addItemsCards(products);
};

// ADD PRODUCTS TO DOCUMENT
const addItemsCards = (products) => {
  const cardSection = document.getElementById("card-section");
  const card = document.createElement("div")
  cardSection.appendChild(card)
  card.classList.add("row", "row-cols-1", "row-cols-md-3", "products", "my-4")

  for (let product of products) {
    const article = document.createElement("article");
    card.appendChild(article);
    article.classList.add("col", "my-4");

    const link = document.createElement("a");
    article.appendChild(link);
    link.href = "product.html?id=" + product._id;

    const box = document.createElement("div");
    link.appendChild(box);
    box.classList.add("card", "shadow");

    const img = document.createElement("img");
    box.appendChild(img);
    img.classList.add("card-img-top");
    img.src = product.imageUrl;

    const body = document.createElement("div");
    box.appendChild(body);
    body.classList.add("card-body", "d-flex", "flex-column");

    const title = document.createElement("h5");
    body.appendChild(title);
    title.classList.add("card-title", "font-weight-bold");
    title.textContent = product.name

    const desc = document.createElement("p");
    body.appendChild(desc);
    desc.classList.add("card-text", "mb-auto", "text-justify", "font-weight-bold");
    desc.textContent = product.description;

    const footer = document.createElement("div");
    body.appendChild(footer);
    footer.classList.add("card-price", "d-flex", "justify-content-end");

    const price = document.createElement("p");
    footer.appendChild(price);
    price.classList.add("price", "font-weight-bold", "my-0");
    price.textContent = formatPrice(product.price);
  }
}

// ON LOAD
document.onload = main();

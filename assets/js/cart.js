// MAIN FUNCTION
const main = async () => {
  let cartItems = JSON.parse(localStorage.getItem("cart"))
  let data = await getData(url)
  addItemsCards(data)
};

const addItemsCards = (data) => {
const cardsItems = document.getElementById("cardsItems")

const cardItem = document.createElement("div")
cardItems.appendChild(cardsItems)
cardItem.classList.add("")
}

// ON LOAD
document.onload = main();

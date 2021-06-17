import { Cart } from './cart'
import * as commonFn from './common'
import { url } from './url'
import '../sass/styles.scss'

// ADD PRODUCT TO DOCUMENT
const addItemCard = async () => {
  const product = await commonFn.getData(url + commonFn.getSearchParams('id'))
  const productMain = document.getElementById('product-main')
  const cardContainer = commonFn.createElementFactory('div', { class: 'card-container' }, productMain)
  commonFn.createCard(cardContainer, product, false, true)
  const footer = document.querySelector('.card-box-body-price')
  const body = document.querySelector('.card-box-body')
  createColorOptions(footer, body, product)
  const button = document.getElementById('addToCart')
  commonFn.buttonAddToCart(button, product)
}

// CREATE OPTIONS SELECT
const createColorOptions = (element1, element2, items) => {
  const inputGroup = commonFn.createElementFactory('div', { class: 'input-group' }, element1)
  const inputGroupPrepend = commonFn.createElementFactory('div', { class: 'input-group-prepend' }, inputGroup)
  const label = commonFn.createElementFactory('label', { class: 'input-group-text', for: 'inputGroupSelect01' }, inputGroupPrepend)
  label.textContent = 'Couleurs'
  const customSelect = commonFn.createElementFactory('select', { class: 'select-color', id: 'inputGroupSelect01' }, inputGroup)
  for (const color of items.colors) {
    const options = commonFn.createElementFactory('option', { value: color }, customSelect)
    options.textContent = color
  }
  const button = commonFn.createElementFactory('button', { class: 'btn', id: 'addToCart' }, element2)
  button.textContent = 'Ajouter au panier'
}

// EXECUTE ON LOAD
window.onload = () => {
  addItemCard()
  const cart = Cart.getCart()
  cart.updateHeader()
}

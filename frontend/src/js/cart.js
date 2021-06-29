// CLASS CART
export class Cart {
  constructor() {
    const cartStorage = localStorage.getItem('cart')
    this.items = cartStorage != null ? JSON.parse(cartStorage) : []
    this.updateEvent = new CustomEvent('updateEvent', {
      detail: {
        cart: this,
      },
    })
  }

  static getCart() {
    if (!Cart.instance) {
      Cart.instance = new Cart()
    }
    return Cart.instance
  }

  addItem(id, color, price, quantity = 1) {
    const addCartItem = {
      id: id,
      color: color,
      price: price,
      quantity: quantity
    }
    const existingItem = this.items.find((item) => {
      return item.id === addCartItem.id && item.color === addCartItem.color
    })
    if (existingItem) {
      existingItem.quantity++
    } else {
      this.items.push(addCartItem)
    }
    this.update()
  }

  removeItem(id, color) {
    const index = this.items.findIndex((item) => item.id === id && item.color === color)
    if (index >= 0) {
      this.items.splice(index, 1)
      this.update()
    }
  }

  updateItemQty(id, color, quantity) {
    const item = this.items.find((item) => item.id === id && item.color === color)
    item.quantity = quantity
    this.update()
  }

  itemsQty() {
    let itemsQty = 0
    for (const item of this.items) {
      itemsQty += item.quantity
    }
    return itemsQty
  }

  totalPrices() {
    let totalPrices = 0
    for (const item of this.items) {
      totalPrices += item.price * item.quantity
    }
    return totalPrices
  }

  getItems() {
    return this.items
  }

  getItemsId() {
    const itemsId = []
    for (const item of this.items) {
      itemsId.push(item.id)
    }
    return itemsId
  }

  update() {
    localStorage.setItem('cart', JSON.stringify(this.items))
    document.dispatchEvent(this.updateEvent)
  }

  updateHeader() {
    document.dispatchEvent(this.updateEvent)
  }
}

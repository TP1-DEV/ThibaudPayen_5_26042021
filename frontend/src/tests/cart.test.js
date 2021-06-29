import {Cart} from '../js/cart.js'

describe('getCart', () => {
  test('it should get cart in localstorage', () => {
    localStorage.clear()
    const cart = (Cart.instance = new Cart())
    expect(cart.items).toEqual([])
  })
})
describe('addItem', () => {
  beforeAll(() => {
    localStorage.clear()
    Cart.instance = new Cart()
  })
  test('it should add an item in the cart in the localstorage', () => {
    const item = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item._id, item.color, item.price)
    const searchItem = cart.items.find((item) => {
      return item.id === 345
    })
    expect(searchItem).not.toBeUndefined()
    expect(searchItem.color).toEqual('Purple')
    expect(searchItem.price).toEqual(2000)
    expect(searchItem.quantity).toEqual(1)
    const cartStorage = localStorage.getItem('cart')
    const localStorageArr = JSON.parse(cartStorage)
    const localStorageItem = localStorageArr.find((item) => {
      return item.id === 345
    })
    expect(localStorageItem).not.toBeUndefined()
    expect(localStorageItem.color).toEqual('Purple')
    expect(localStorageItem.price).toEqual(2000)
    expect(localStorageItem.quantity).toEqual(1)
  })
  test('it should increment quantity if item already in cart in the localstorage', () => {
    const item = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item._id, item.color, item.price)
    const searchItem = cart.items.find((item) => {
      return item.id === 345
    })
    expect(searchItem.quantity).toEqual(2)
    const cartStorage = localStorage.getItem('cart')
    const localStorageArr = JSON.parse(cartStorage)
    const localStorageItem = localStorageArr.find((item) => {
      return item.id === 345
    })
    expect(localStorageItem.quantity).toEqual(2)
  })
})
describe('removeItem', () => {
  beforeAll(() => {
    localStorage.clear()
    Cart.instance = new Cart()
  })
  test('it should remove item in the cart in the localstorage', () => {
    const item = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item._id, item.color, item.price)
    const cartStorage = localStorage.getItem('cart')
    const localStorageArr = JSON.parse(cartStorage)
    expect(localStorageArr).toEqual([{color: 'Purple', id: 345, price: 2000, quantity: 1}])
    cart.removeItem(item._id, item.color)
    const newCartStorage = localStorage.getItem('cart')
    const newLocalStorageArr = JSON.parse(newCartStorage)
    expect(newLocalStorageArr.length).toEqual(0)
  })
})
describe('updateCartQty', () => {
  beforeAll(() => {
    localStorage.clear()
    Cart.instance = new Cart()
  })
  test('it should update the item qty in the localstorage', () => {
    const item = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item._id, item.color, item.price)
    const searchItem = cart.items.find((item) => {
      return item.id === 345
    })
    expect(searchItem.quantity).toEqual(1)
    cart.updateItemQty(item._id, item.color, 4)
    expect(searchItem.quantity).toEqual(4)
  })
})
describe('itemsQty', () => {
  beforeAll(() => {
    localStorage.clear()
    Cart.instance = new Cart()
  })
  test('it should sum items', () => {
    const item0 = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const item1 = {
      _id: 912,
      name: 'Garfunkel',
      price: 1000,
      color: 'Brown',
      quantity: 1,
    }
    const item2 = {
      _id: 678,
      name: 'Eva',
      price: 3000,
      color: 'Pink',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item0._id, item0.color, item0.price)
    cart.addItem(item1._id, item1.color, item1.price)
    cart.addItem(item2._id, item2.color, item2.price)
    const totalQty = cart.itemsQty()
    expect(totalQty).toEqual(3)
  })
})
describe('totalPrices', () => {
  beforeAll(() => {
    localStorage.clear()
    Cart.instance = new Cart()
  })
  test('it should sum prices', () => {
    const item0 = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const item1 = {
      _id: 912,
      name: 'Garfunkel',
      price: 1000,
      color: 'Brown',
      quantity: 1,
    }
    const item2 = {
      _id: 678,
      name: 'Eva',
      price: 3000,
      color: 'Pink',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item0._id, item0.color, item0.price)
    cart.addItem(item1._id, item1.color, item1.price)
    cart.addItem(item2._id, item2.color, item2.price)
    const totalPrices = cart.totalPrices()
    expect(totalPrices).toEqual(6000)
  })
})
describe('getItems', () => {
  beforeAll(() => {
    localStorage.clear()
    Cart.instance = new Cart()
  })
  test('it should return the cart in the localstorage', () => {
    const item = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item._id, item.color, item.price)
    const getCart = cart.getItems()
    expect(getCart).toEqual([{id: 345, color: 'Purple', price: 2000, quantity: 1}])
  })
})
describe('getItemsId', () => {
  beforeAll(() => {
    localStorage.clear()
    Cart.instance = new Cart()
  })
  test('it should return in array all items id', () => {
    const item0 = {
      _id: 345,
      name: 'Ted',
      price: 2000,
      color: 'Purple',
      quantity: 1,
    }
    const item1 = {
      _id: 912,
      name: 'Garfunkel',
      price: 1000,
      color: 'Brown',
      quantity: 1,
    }
    const item2 = {
      _id: 678,
      name: 'Eva',
      price: 3000,
      color: 'Pink',
      quantity: 1,
    }
    const cart = Cart.getCart()
    cart.addItem(item0._id, item0.color, item0.price)
    cart.addItem(item1._id, item1.color, item1.price)
    cart.addItem(item2._id, item2.color, item2.price)
    const arrItemsId = cart.getItemsId()
    expect(arrItemsId).toEqual([345, 912, 678])
  })
})
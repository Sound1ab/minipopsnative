import { createSelector } from 'reselect'

const getProducts = state => state.compare.products

export const products = createSelector(getProducts, products => ({
  ...products,
  eBay: products.eBay.map(product => ({
    title: product.title,
    link: product.itemUrl,
    price: `£${product.price}`,
    image: product.imageUrl[0],
  })),
}))

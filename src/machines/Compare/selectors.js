import { createSelector } from 'reselect'

const getProducts = state => state.compare.products

export const products = createSelector(getProducts, products => products)
